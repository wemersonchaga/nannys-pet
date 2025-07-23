from django.db import models

# Modelo base abstrato
class Pessoa(models.Model):
    nome = models.CharField(max_length=100)
    sobrenome = models.CharField(max_length=100)
    data_nascimento = models.DateField(null=True, blank=True)
    cpf = models.CharField(max_length=14, unique=True)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=128)
    foto_perfil = models.ImageField(upload_to='perfil/', blank=True, null=True)

    class Meta:
        abstract = True

# Tutor - dono do pet
class Tutor(Pessoa):
    plataforma_indicacao = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'

# Cuidador - quem hospeda pets
class Cuidador(Pessoa):
    telefone = models.CharField(max_length=15)
    cep = models.CharField(max_length=8, null=True)
    estado = models.CharField(max_length=100, null=True)
    cidade = models.CharField(max_length=100, null=True)
    rua = models.CharField(max_length=100)
    numero = models.CharField(max_length=10, default='S/N')
    instagram = models.CharField(max_length=100, blank=True, null=True)
    disponivel = models.BooleanField(default=True)  # Novo campo

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'

# Pet do tutor
class Pet(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE, related_name='pets')
    nome = models.CharField(max_length=100)
    especie = models.CharField(max_length=50)
    raca = models.CharField(max_length=50, blank=True, null=True)
    porte = models.CharField(max_length=20)  # Ex: pequeno, médio, grande
    idade = models.PositiveIntegerField()
    castrado = models.BooleanField(default=False)
    genero = models.CharField(max_length=10, choices=[('Macho', 'Macho'), ('Fêmea', 'Fêmea')])
    foto = models.ImageField(upload_to='pets/', blank=True, null=True)  # Novo campo
    observacoes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.nome} ({self.especie})'

# Pedido de hospedagem (solicitação do tutor)
class Pedido(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovado', 'Aprovado'),
        ('recusado', 'Recusado'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    ]

    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE, related_name='pedidos')
    cuidador = models.ForeignKey(Cuidador, on_delete=models.CASCADE, related_name='pedidos_recebidos')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    observacoes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Hospedagem {self.pet.nome} de {self.data_inicio} a {self.data_fim} - {self.status}'

# Avaliação de cuidadores
class AvaliacaoCuidador(models.Model):
    cuidador = models.ForeignKey(Cuidador, on_delete=models.CASCADE, related_name='avaliacoes')
    nota = models.PositiveSmallIntegerField()
    comentario = models.TextField(blank=True)
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Avaliação para {self.cuidador.nome} - Nota {self.nota}'

# Características do cuidador
class CaracteristicasCuidador(models.Model):
    cuidador = models.OneToOneField(Cuidador, on_delete=models.CASCADE, related_name='caracteristicas')

    estudante_de_veterinaria = models.BooleanField(default=False)
    medico_veterinario = models.BooleanField(default=False)
    capacidade_adestramento = models.BooleanField(default=False)
    aceita_multiplos_pets = models.BooleanField(default=False)

    pet_ate_5kg = models.BooleanField(default=False)
    pet_5kg_a_10kg = models.BooleanField(default=False)
    pet_10kg_a_20kg = models.BooleanField(default=False)
    pet_20kg_a_40kg = models.BooleanField(default=False)

    so_pet_castrado = models.BooleanField(default=False)
    pet_nao_castrado = models.BooleanField(default=False)
    pet_femea = models.BooleanField(default=False)
    pet_macho = models.BooleanField(default=False)

    medicacao_oral = models.BooleanField(default=False)
    medicacao_injetavel = models.BooleanField(default=False)

    def __str__(self):
        return f'Características de {self.cuidador.nome}'

# Imagens do ambiente do cuidador
class ImagemAmbiente(models.Model):
    cuidador = models.ForeignKey(Cuidador, on_delete=models.CASCADE, related_name='imagens')
    foto = models.ImageField(upload_to='ambientes/')

    def __str__(self):
        return f'Imagem do ambiente - {self.cuidador.nome}'
