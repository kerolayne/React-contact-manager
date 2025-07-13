import React, { useState, useMemo } from 'react';

/**
 * Componente para exibir e filtrar uma lista de contactos.
 * @param {object} props - As propriedades do componente.
 * @param {Array<object>} [props.contacts=[]] - A lista de contactos a ser exibida. O padrão é uma lista vazia para evitar erros.
 * @param {function} props.onDelete - Função a ser chamada para apagar um contacto, recebe o id.
 * @param {function} props.onEdit - Função a ser chamada para editar um contacto, recebe o objeto do contacto.
 */
export default function ContactList({ contacts = [], onDelete, onEdit }) {
    // Estado para controlar o valor do campo de filtro
    const [filter, setFilter] = useState('');

    // Filtra os contactos com base no texto do filtro.
    // useMemo otimiza o desempenho, recalculando a lista apenas quando 'contacts' ou 'filter' mudam.
    const filteredContacts = useMemo(() => {
        if (!filter) {
            return contacts;
        }
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [contacts, filter]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Os Meus Contactos</h2>
            
            {/* Campo de input para o filtro */}
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar por nome..."
                className="mb-6 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            
            {/* Lista de contactos */}
            {filteredContacts.length > 0 ? (
                <ul className="space-y-4">
                    {filteredContacts.map(contact => (
                        <li 
                            key={contact.id} 
                            className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors"
                        >
                            {/* Detalhes do contacto */}
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-900">{contact.name}</p>
                                <p className="text-sm text-gray-600">{contact.email || 'Sem e-mail'}</p>
                                <p className="text-sm text-gray-600">{contact.phone || 'Sem telefone'}</p>
                            </div>
                            {/* Botões de Ação */}
                            <div className="flex-shrink-0 flex space-x-2">
                                <button 
                                    onClick={() => onEdit(contact)} 
                                    className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(contact.id)} 
                                    className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                                >
                                    Apagar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                 <p className="text-center text-gray-500 py-4">
                    {contacts.length > 0 ? 'Nenhum contacto corresponde ao filtro.' : 'Nenhum contacto adicionado ainda.'}
                 </p>
            )}
        </div>
    );
}
