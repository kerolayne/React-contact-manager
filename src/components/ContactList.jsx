import React, { useState, useMemo } from 'react';


export default function ContactList({ contacts = [], onDelete, onEdit }) {
    const [filter, setFilter] = useState('');

    const filteredContacts = useMemo(() => {
        if (!filter) return contacts;
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    }, [contacts, filter]);

    return (
        <>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar por nome..."
                className="filter-input"
            />
            
            {filteredContacts.length > 0 ? (
                <ul className="contact-list">
                    {filteredContacts.map(contact => (
                        <li key={contact.id} className="contact-card">
                            <div>
                                <h3>{contact.name}</h3>
                                <p>{contact.email || 'Sem e-mail'}</p>
                                <p>{contact.phone || 'Sem telefone'}</p>
                            </div>
                            {/*
                              ALTERAÇÃO PRINCIPAL:
                              Os botões de "Editar" e "Apagar" agora usam as classes
                              'edit-button' e 'delete-button' do ficheiro index.css.
                            */}
                            <div className="contact-buttons">
                                <button onClick={() => onEdit(contact)} className="edit-button">
                                    Editar
                                </button>
                                <button onClick={() => onDelete(contact.id)} className="delete-button">
                                    Apagar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                 <p className="no-contacts-message">
                    {contacts.length > 0 ? 'Nenhum contacto corresponde ao filtro.' : 'Nenhum contacto adicionado ainda.'}
                 </p>
            )}
        </>
    );
}
