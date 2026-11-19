import pytest

from pricing import apply_discount


@pytest.mark.parametrize(
    "price,percent,expected",
    [
        (1000, 0, 1000),
        (1000, 25, 750),
        (1000, 100, 0),
    ],
)
def test_apply_discount_valid(price: int, percent: int, expected: int) -> None:
    assert apply_discount(price, percent) == expected


def test_apply_discount_rejects_out_of_range() -> None:
    with pytest.raises(ValueError, match="between 0 and 100"):
        apply_discount(1000, 150)


def test_env_override_with_monkeypatch(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("TAX_RATE", "0.08")
    import os
    assert os.environ["TAX_RATE"] == "0.08"
