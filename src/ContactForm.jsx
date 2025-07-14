import React, { useState, useEffect, useMemo } from 'react';

/**
 * Componente de formulário para adicionar ou editar um contacto.
 * Utiliza as classes de estilo globais definidas em index.css.
 */
export default function ContactForm({ currentContact, onSave, onCancelEdit }) {
    // Estado para os campos do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const isEditing = useMemo(() => !!currentContact, [currentContact]);

    useEffect(() => {
        if (isEditing) {
            setName(currentContact.name || '');
            setEmail(currentContact.email || '');
            setPhone(currentContact.phone || '');
        } else {
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [currentContact, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            // A utilização de alert() não é ideal numa aplicação React.
            // Considere um componente de notificação para uma melhor UX.
            console.error('O nome é obrigatório.');
            return;
        }
        onSave({ id: currentContact?.id, name, email, phone });
    };

    // Note que as classes de estilo antigas foram removidas
    // e substituídas pelas que definimos no index.css.
    return (
        <div>
            <h2>{isEditing ? 'Editar Contacto' : 'Adicionar Novo Contacto'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Cada campo está agora envolvido num 'form-group' para um espaçamento consistente */}
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do Contacto"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@exemplo.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(+351) 912 345 678"
                    />
                </div>
                <div className="contact-buttons">
                    {/*
                      ALTERAÇÃO PRINCIPAL:
                      O botão de submissão agora usa a classe 'submit-button' do nosso CSS.
                      Isto aplica o fundo preto, texto branco e bordas arredondadas.
                    */}
                    <button type="submit" className="submit-button">
                        {isEditing ? 'Atualizar Contacto' : 'Guardar Contacto'}
                    </button>

                    {/*
                      ALTERAÇÃO SECUNDÁRIA:
                      O botão de cancelar usa a classe 'btn-secondary' para um estilo consistente.
                    */}
                    {isEditing && (
                        <button type="button" onClick={onCancelEdit} className="btn btn-secondary">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
