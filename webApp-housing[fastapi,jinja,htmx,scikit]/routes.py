import pickle
import numpy as np
from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sklearn.ensemble import RandomForestRegressor


with open('models/regressor.pkl','rb') as f:
    model=pickle.load(f)

templates = Jinja2Templates(directory='templates')
router = APIRouter()

@router.get('/', response_class=HTMLResponse)
async def home (request:Request):
    context = {'request':request}
    return templates.TemplateResponse('index.html', context=context)

@router.post('/previsao')
async def previsao (request:Request):
    form = await request.form()
    
    try:
        rm:int = int(form.get('comodos'))
        lstat:int = int(form.get('classe-baixa'))
        ptratio:int = int(form.get('aluno-professor'))

    except ValueError:
        return HTMLResponse('<div class="error">Input inválido</div>', status_code=400)
    
    x = np.array([[rm, lstat, ptratio]])
    y_pred = model.predict(x)

    return HTMLResponse(f'''
            <div class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <strong class="font-bold">Previsão:</strong>
                <span class="block sm:inline">$ {round(y_pred[0], 2)}</span>
            </div>
        ''')
