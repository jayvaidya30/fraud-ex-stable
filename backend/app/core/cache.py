"""
Simple in-memory cache with TTL support.
"""

import time
from dataclasses import dataclass
from typing import Any, Callable
from functools import wraps


@dataclass
class CacheEntry:
    """Cache entry with value and expiration time."""
    value: Any
    expires_at: float


class SimpleCache:
    """Thread-safe in-memory cache with TTL."""

    def __init__(self):
        self._cache: dict[str, CacheEntry] = {}

    def get(self, key: str) -> Any | None:
        """Get value from cache if not expired."""
        entry = self._cache.get(key)
        if entry is None:
            return None
        if time.time() > entry.expires_at:
            del self._cache[key]
            return None
        return entry.value

    def set(self, key: str, value: Any, ttl_seconds: int = 30) -> None:
        """Set value in cache with TTL."""
        self._cache[key] = CacheEntry(
            value=value,
            expires_at=time.time() + ttl_seconds,
        )

    def invalidate(self, key: str) -> None:
        """Remove key from cache."""
        self._cache.pop(key, None)

    def invalidate_prefix(self, prefix: str) -> None:
        """Remove all keys with given prefix."""
        keys_to_remove = [k for k in self._cache.keys() if k.startswith(prefix)]
        for key in keys_to_remove:
            del self._cache[key]

    def clear(self) -> None:
        """Clear all cache entries."""
        self._cache.clear()


# Global cache instance
analytics_cache = SimpleCache()


def cached(ttl_seconds: int = 30, key_prefix: str = ""):
    """
    Decorator to cache async function results.
    
    Args:
        ttl_seconds: Time-to-live for cache entries
        key_prefix: Prefix for cache key (defaults to function name)
    """
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Build cache key from function name and arguments
            prefix = key_prefix or func.__name__
            # Use user_id from kwargs if available for user-specific caching
            user_id = kwargs.get("user_id", "global")
            cache_key = f"{prefix}:{user_id}"
            
            # Check cache
            cached_value = analytics_cache.get(cache_key)
            if cached_value is not None:
                return cached_value
            
            # Call function and cache result
            result = await func(*args, **kwargs)
            analytics_cache.set(cache_key, result, ttl_seconds)
            return result
        
        return wrapper
    return decorator
