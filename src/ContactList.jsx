import React, { useState, useMemo } from 'react';

/**
 * Componente para exibir e filtrar uma lista de contactos.
 * Utiliza as classes de estilo globais definidas em index.css.
 */
export default function ContactList({ contacts = [], onDelete, onEdit }) {
    // Estado para controlar o valor do campo de filtro
    const [filter, setFilter] = useState('');

    // Filtra os contactos com base no texto do filtro.
    // useMemo otimiza o desempenho, recalculando a lista apenas quando 'contacts' ou 'filter' mudam.
    const filteredContacts = useMemo(() => {
        if (!filter) return contacts;
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    }, [contacts, filter]);

    // As classes de estilo antigas foram removidas para usar os estilos globais.
    return (
        <div>
            <h2>Os Meus Contactos</h2>
            
            {/* O campo de filtro agora herda o estilo global para inputs,
              sem precisar de classes específicas.
            */}
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar por nome..."
            />
            
            {/* A lista de contactos agora usa a classe 'contact-list' para o layout em grelha. */}
            {filteredContacts.length > 0 ? (
                <ul className="contact-list">
                    {filteredContacts.map(contact => (
                        // CADA 'li' É AGORA UM 'contact-card'
                        <li key={contact.id} className="contact-card">
                            {/* Detalhes do contacto */}
                            <div>
                                <h3>{contact.name}</h3>
                                <p>{contact.email || 'Sem e-mail'}</p>
                                <p>{contact.phone || 'Sem telefone'}</p>
                            </div>

                            {/*
                              ALTERAÇÃO PRINCIPAL:
                              Os botões estão agora dentro de um container 'contact-buttons'
                              e usam as classes 'edit-button' e 'delete-button'.
                            */}
                            <div className="contact-buttons">
                                <button 
                                    onClick={() => onEdit(contact)} 
                                    className="edit-button"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(contact.id)} 
                                    className="delete-button"
                                >
                                    Apagar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                 <p style={{ textAlign: 'center', padding: '1rem 0' }}>
                    {contacts.length > 0 ? 'Nenhum contacto corresponde ao filtro.' : 'Nenhum contacto adicionado ainda.'}
                 </p>
            )}
        </div>
    );
}
