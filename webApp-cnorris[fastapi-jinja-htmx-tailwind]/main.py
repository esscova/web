import requests
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from translate import Translator

app = FastAPI()
templates = Jinja2Templates(directory='templates')
api = 'https://api.chucknorris.io/jokes/random'
translator = Translator(to_lang='pt')

@app.get('/', response_class=HTMLResponse)
async def home (request:Request):

    return templates.TemplateResponse('index.html', {
        'request':request,
    })

@app.get('/api/chuckfacts', response_class=HTMLResponse)
async def home (request:Request):

    response = requests.get(api)
    data = response.json()

    return templates.TemplateResponse('content.html', {
        'request':request,
        'icon':data['icon_url'],
        'value':translator.translate(data['value'])
    })