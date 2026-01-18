"""
Analytics routes for dashboard aggregations.

Features caching to reduce redundant Supabase calls.
"""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_case_service, require_user
from app.core.cache import analytics_cache
from app.core.supabase_auth import CurrentUser
from app.domain.errors import DomainError
from app.schemas.analytics import AnalyticsSummary
from app.services.analytics_service import compute_analytics_summary
from app.services.case_service import CaseService

router = APIRouter()

# Cache TTL in seconds
CACHE_TTL = 30


async def _get_cases_cached(service: CaseService, user_id: str) -> list[dict]:
    """Get cases with caching to reduce Supabase calls."""
    cache_key = f"cases:{user_id}"
    cached = analytics_cache.get(cache_key)
    if cached is not None:
        return cached
    
    cases = await service.list_cases()
    case_dicts = [
        {
            "case_id": c.case_id,
            "status": c.status,
            "risk_score": c.risk_score,
            "signals": c.signals,
            "created_at": c.created_at,
        }
        for c in cases
    ]
    analytics_cache.set(cache_key, case_dicts, CACHE_TTL)
    return case_dicts


@router.get("/summary", response_model=AnalyticsSummary)
async def get_analytics_summary(
    *,
    user: CurrentUser = Depends(require_user),
    service: CaseService = Depends(get_case_service),
) -> Any:
    """
    Get analytics summary for the dashboard.

    Returns aggregated metrics including:
    - Risk distribution
    - Status distribution
    - Time trends (7d and 30d)
    - Top signals
    - Detector statistics
    - Cohort analysis
    """
    try:
        # Use cached case data
        case_dicts = await _get_cases_cached(service, user.id)
        return compute_analytics_summary(case_dicts)
    except DomainError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/risk-distribution")
async def get_risk_distribution(
    *,
    user: CurrentUser = Depends(require_user),
    service: CaseService = Depends(get_case_service),
) -> Any:
    """Get risk score distribution."""
    try:
        # Use cached case data
        cases = await _get_cases_cached(service, user.id)

        distribution = {"low": 0, "medium": 0, "high": 0, "critical": 0}
        scores = []

        for case in cases:
            if case.get("status") == "analyzed" and case.get("risk_score") is not None:
                scores.append(case["risk_score"])
                if case["risk_score"] >= 75:
                    distribution["critical"] += 1
                elif case["risk_score"] >= 50:
                    distribution["high"] += 1
                elif case["risk_score"] >= 25:
                    distribution["medium"] += 1
                else:
                    distribution["low"] += 1

        return {
            "distribution": distribution,
            "total_analyzed": len(scores),
            "average_score": round(sum(scores) / len(scores), 1) if scores else 0,
            "min_score": min(scores) if scores else 0,
            "max_score": max(scores) if scores else 0,
        }
    except DomainError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/signals")
async def get_signal_breakdown(
    *,
    user: CurrentUser = Depends(require_user),
    service: CaseService = Depends(get_case_service),
) -> Any:
    """Get breakdown of triggered signals across all cases."""
    try:
        # Use cached case data
        cases = await _get_cases_cached(service, user.id)

        signal_stats: dict[str, dict] = {}

        for case in cases:
            if case.get("status") != "analyzed" or not case.get("signals"):
                continue

            detector_breakdown = case["signals"].get("detector_breakdown", {})

            for detector_name, detector_data in detector_breakdown.items():
                if not isinstance(detector_data, dict):
                    continue

                score = detector_data.get("score", 0)

                if detector_name not in signal_stats:
                    signal_stats[detector_name] = {
                        "name": detector_name,
                        "triggered_count": 0,
                        "total_score": 0,
                        "max_score": 0,
                        "case_ids": [],
                    }

                if score > 0:
                    stats = signal_stats[detector_name]
                    stats["triggered_count"] += 1
                    stats["total_score"] += score
                    stats["max_score"] = max(stats["max_score"], score)
                    if len(stats["case_ids"]) < 10:
                        stats["case_ids"].append(case["case_id"])

        # Calculate averages
        for stats in signal_stats.values():
            if stats["triggered_count"] > 0:
                stats["avg_score"] = round(
                    stats["total_score"] / stats["triggered_count"], 1
                )
            else:
                stats["avg_score"] = 0
            del stats["total_score"]

        return {
            "signals": sorted(
                signal_stats.values(),
                key=lambda x: x["triggered_count"],
                reverse=True,
            ),
        }
    except DomainError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
