$venvActivate = "C:/Users/Acer/Dev/WebDev/React/Food_Vault/backend/.venv/Scripts/activate.ps1"

& $venvActivate

uvicorn app.main:app --reload --port 8000