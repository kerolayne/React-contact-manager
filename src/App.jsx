import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import React, { useState, useEffect } from 'react';

// 1. Importar os componentes e a configuração do Firebase
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { db , auth} from './firebaseConfig';

// 2. Importar as funções necessárias do SDK do Firebase
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { 
    collection, 
    doc, 
    onSnapshot, 
    addDoc, 
    updateDoc, 
    deleteDoc 
} from 'firebase/firestore';

/**
 * Componente Principal App
 * Gere o estado e orquestra o fluxo da aplicação.
 */
export default function App() {
    const [contacts, setContacts] = useState([]);
    const [currentContact, setCurrentContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    // Efeito para autenticação anónima do utilizador
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                try {
                    await signInAnonymously(auth);
                } catch (err) {
                    console.error("Erro de Autenticação Anónima:", err);
                    setError("Falha na autenticação. Não é possível carregar ou guardar dados.");
                }
            }
        });
        return () => unsubscribe();
    }, []);

    // Efeito para carregar os contactos em tempo real
    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const contactsCollectionRef = collection(db, `users/${userId}/contacts`);
        
        const unsubscribe = onSnapshot(contactsCollectionRef, (snapshot) => {
            const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setContacts(contactsData);
            setLoading(false);
        }, (err) => {
            console.error("Erro no Snapshot do Firestore:", err);
            setError("Não foi possível carregar os contactos.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    // Função para guardar (adicionar ou atualizar) um contacto - VERSÃO DEFENSIVA
    const handleSaveContact = async (contact) => {
        if (!userId) {
            alert("Utilizador não autenticado.");
            return;
        }
        
        console.log("A tentar guardar o seguinte contacto:", contact);

        try {
            // Cria um objeto de dados limpo, garantindo que não há campos indefinidos
            const dataToSave = {
                name: contact.name || '',
                email: contact.email || '',
                phone: contact.phone || ''
            };

            console.log("Dados que serão enviados para o Firestore:", dataToSave);

            if (contact.id) {
                // Se existe um ID, ATUALIZA o documento existente.
                console.log(`A atualizar o documento com ID: ${contact.id}`);
                const contactDocRef = doc(db, `users/${userId}/contacts`, contact.id);
                await updateDoc(contactDocRef, dataToSave);
                console.log("Documento atualizado com sucesso.");
            } else {
                // Se NÃO existe um ID, ADICIONA um novo documento.
                console.log("A adicionar um novo documento.");
                const contactsCollectionRef = collection(db, `users/${userId}/contacts`);
                await addDoc(contactsCollectionRef, dataToSave);
                console.log("Novo documento adicionado com sucesso.");
            }
            setCurrentContact(null);
        } catch (err) {
            console.error("ERRO DETALHADO ao guardar no Firestore:", err);
            alert("Ocorreu um erro ao guardar o contacto. Verifique a consola para mais detalhes.");
        }
    };

    // Função para apagar um contacto
    const handleDeleteContact = async (id) => {
        if (!userId) {
            alert("Utilizador não autenticado.");
            return;
        }
        if (window.confirm("Tem a certeza que deseja apagar este contacto?")) {
            try {
                const contactDocRef = doc(db, `users/${userId}/contacts`, id);
                await deleteDoc(contactDocRef);
            } catch (err) {
                console.error("Erro ao apagar o contacto:", err);
                alert("Ocorreu um erro ao apagar o contacto.");
            }
        }
    };
    
    // Função para selecionar um contacto para edição
    const handleEditContact = (contact) => {
        setCurrentContact(contact);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Função para cancelar a edição
    const handleCancelEdit = () => {
        setCurrentContact(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">
                        
                        Gestor de Contactos
                    </h1>
                </div>
            </header>
            <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                    
                    <ContactForm 
                        currentContact={currentContact} 
                        onSave={handleSaveContact} 
                        onCancelEdit={handleCancelEdit} 
                    />

                    {loading ? (
                        <p className="text-center text-gray-600">A carregar contactos...</p>
                    ) : (
                        <ContactList 
                            contacts={contacts} 
                            onEdit={handleEditContact} 
                            onDelete={handleDeleteContact} 
                        />
                    )}
                </div>
            </main>
        </div>
    );
}