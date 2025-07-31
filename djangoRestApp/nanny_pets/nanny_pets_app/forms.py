from django import forms
from .models import ImagemAmbiente

class ImagemAmbienteBatchUploadForm(forms.ModelForm):
    fotos = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))

    class Meta:
        model = ImagemAmbiente
        fields = ['cuidador', 'fotos']
