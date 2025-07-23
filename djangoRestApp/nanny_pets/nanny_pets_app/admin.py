from django.contrib import admin
from .models import (
    Tutor, Cuidador, Pet, AvaliacaoCuidador,
    CaracteristicasCuidador, ImagemAmbiente, Pedido
)

# ─── INLINE CONFIGURAÇÕES ─────────────────────────

class PetInline(admin.TabularInline):
    model = Pet
    extra = 0
    fields = ('nome', 'especie', 'porte', 'genero', 'idade', 'castrado')

class PedidoInline(admin.TabularInline):
    model = Pedido
    extra = 0
    fields = ('pet', 'data_inicio', 'data_fim', 'status')
    readonly_fields = ('status',)
    show_change_link = True

# ─── AÇÕES EM MASSA PARA PEDIDOS ─────────────────

@admin.action(description='Aprovar pedidos selecionados')
def aprovar_pedidos(modeladmin, request, queryset):
    queryset.update(status='aprovado')

@admin.action(description='Recusar pedidos selecionados')
def recusar_pedidos(modeladmin, request, queryset):
    queryset.update(status='recusado')

@admin.action(description='Cancelar pedidos selecionados')
def cancelar_pedidos(modeladmin, request, queryset):
    queryset.update(status='cancelado')

# ─── CONFIGURAÇÕES ADMIN DE MODELOS ──────────────

@admin.register(Tutor)
class TutorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'sobrenome', 'email', 'plataforma_indicacao')
    search_fields = ('nome', 'sobrenome', 'email')
    inlines = [PetInline]
    fieldsets = (
        ('Informações Pessoais', {
            'fields': ('nome', 'sobrenome', 'data_nascimento', 'foto_perfil')
        }),
        ('Acesso e Identificação', {
            'fields': ('cpf', 'email', 'senha', 'plataforma_indicacao')
        }),
    )

@admin.register(Cuidador)
class CuidadorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'sobrenome', 'email', 'cidade', 'estado', 'disponivel')
    list_filter = ('disponivel', 'estado')
    search_fields = ('nome', 'sobrenome', 'email', 'cidade')
    inlines = [PedidoInline]
    fieldsets = (
        ('Informações Pessoais', {
            'fields': ('nome', 'sobrenome', 'data_nascimento', 'foto_perfil')
        }),
        ('Contato e Endereço', {
            'fields': ('telefone', 'cep', 'estado', 'cidade', 'rua', 'numero', 'instagram')
        }),
        ('Acesso e Disponibilidade', {
            'fields': ('cpf', 'email', 'senha', 'disponivel')
        }),
    )

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('nome', 'especie', 'porte', 'genero', 'tutor')
    list_filter = ('especie', 'porte', 'castrado')
    search_fields = ('nome', 'raca')

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('pet', 'tutor', 'cuidador', 'data_inicio', 'data_fim', 'status')
    list_filter = ('status', 'data_inicio')
    search_fields = ('pet__nome', 'tutor__nome', 'cuidador__nome')
    date_hierarchy = 'data_inicio'
    actions = [aprovar_pedidos, recusar_pedidos, cancelar_pedidos]

@admin.register(CaracteristicasCuidador)
class CaracteristicasCuidadorAdmin(admin.ModelAdmin):
    list_display = ('cuidador', 'estudante_de_veterinaria', 'medico_veterinario',
                    'aceita_multiplos_pets', 'capacidade_adestramento')

@admin.register(AvaliacaoCuidador)
class AvaliacaoCuidadorAdmin(admin.ModelAdmin):
    list_display = ('cuidador', 'nota', 'data_hora')
    list_filter = ('nota',)
    search_fields = ('cuidador__nome',)

@admin.register(ImagemAmbiente)
class ImagemAmbienteAdmin(admin.ModelAdmin):
    list_display = ('cuidador', 'foto')
