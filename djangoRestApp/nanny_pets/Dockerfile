# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.9

EXPOSE 8000

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1


WORKDIR /nanny_pets
COPY . /nanny_pets
# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
