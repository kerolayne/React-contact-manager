import React, { useState, useEffect, useMemo } from 'react';

/**
 * Componente de formulário para adicionar ou editar um contacto.
 * @param {object} props - As propriedades do componente.
 * @param {function} props.onSubmit - Função a ser chamada ao submeter o formulário. Recebe os dados do contacto.
 * @param {object | null} props.selectedContact - O contacto atualmente selecionado para edição. Null se for um novo contacto.
 * @param {function} props.clearSelection - Função para limpar a seleção e cancelar o modo de edição.
 */
export default function ContactForm({ onSubmit, selectedContact, clearSelection }) {
    // Estado para os campos do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Determina se o formulário está em modo de edição
    const isEditing = useMemo(() => !!selectedContact, [selectedContact]);

    // Efeito para preencher o formulário quando um contacto é selecionado para edição
    // ou para limpar os campos se a seleção for removida.
    useEffect(() => {
        if (isEditing) {
            setName(selectedContact.name || '');
            setEmail(selectedContact.email || '');
            setPhone(selectedContact.phone || '');
        } else {
            // Limpa o formulário se não houver contacto selecionado
            setName('');
            setEmail('');
            setPhone('');
        }
    }, [selectedContact, isEditing]);

    /**
     * Lida com a submissão do formulário.
     * @param {React.FormEvent} e - O evento do formulário.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            // Idealmente, a validação seria mais robusta
            alert('O nome é obrigatório.');
            return;
        }

        // Chama a função onSubmit passada via props com os dados do contacto.
        // Inclui o id se estiver a editar.
        onSubmit({
            id: selectedContact ? selectedContact.id : null,
            name,
            email,
            phone,
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {isEditing ? 'Editar Contacto' : 'Adicionar Novo Contacto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do Contacto"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@exemplo.com"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefone
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(+351) 912 345 678"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        {isEditing ? 'Atualizar Contacto' : 'Guardar Contacto'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={clearSelection} // Chama a função para cancelar a edição
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
