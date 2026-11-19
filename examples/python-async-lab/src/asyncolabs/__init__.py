"""asyncolabs — cursor-paginated async HTTP client with bounded retries.

This package is the reference implementation for the lab in
`docs/part-03-python-development/09-python-fundamentals-deep/
09-3-packaging-virtual-environments-and-async/
09-3-3-asyncio-and-concurrent-io.mdx` (topic 09.3.3).
"""

from asyncolabs.pagination import fetch_all

__all__ = ["fetch_all"]
__version__ = "0.1.0"
