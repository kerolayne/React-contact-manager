import React, { useState, useEffect, useMemo } from 'react';


export default function ContactForm({ currentContact, onSave, onCancelEdit }) {
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
            console.error('O nome é obrigatório.');
            return;
        }
        onSave({ id: currentContact?.id, name, email, phone });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do contacto"
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
            {/*
              ALTERAÇÃO PRINCIPAL:
              Os botões agora têm as classes 'btn-primary' e 'btn-secondary'
              para receberem o estilo do ficheiro index.css.
            */}
            <div className="form-buttons">
                <button type="submit" className="btn-primary">
                    {isEditing ? 'Atualizar contacto' : 'Guardar contacto'}
                </button>
                {isEditing && (
                    <button type="button" onClick={onCancelEdit} className="btn-secondary">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
