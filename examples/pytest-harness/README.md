# 09.3.2 pytest Harness Lab

The minimal, zero-install pytest layout taught in Part 03 (`09.3.2`). Everything works offline.

## Layout

```text
examples/pytest-harness/
├── pyproject.toml        # [tool.pytest.ini_options] testpaths + pythonpath
├── src/pricing.py        # application code
└── tests/test_pricing.py # tests import it directly
```

`pythonpath = ["src"]` (pytest ≥ 7.0) puts `src/` on the import path, so `from pricing import apply_discount` works **without an editable install**.

## Run

```bash
cd examples/pytest-harness
python -m venv .venv
. .venv/Scripts/activate    # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -e ".[dev]"     # or just: pip install pytest
pytest -v
```

Expected (indicative): `5 passed`.

For real applications, switch to the editable-install + `src` package layout shown in the lesson — it scales beyond single modules.
