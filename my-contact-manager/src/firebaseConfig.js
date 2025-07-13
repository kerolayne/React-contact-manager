// Importações necessárias do SDK do Firebase
import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc 
} from 'firebase/firestore';

// --- Configuração do Firebase ---
// Num projeto local, estas credenciais viriam de um ficheiro .env
// Ex: const firebaseConfig = { apiKey: process.env.VITE_API_KEY, ... };
const firebaseConfig = (() => {
    try {
        // Esta variável global é fornecida pelo ambiente de execução para a conexão.
        return JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
    } catch (e) {
        console.error("A configuração do Firebase não é um JSON válido ou não foi fornecida:", e);
        return {};
    }
})();

// Inicializa a aplicação Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cria uma referência para a coleção "contacts" no Firestore.
// Todas as operações serão feitas sobre esta coleção.
const contactsCollectionRef = collection(db, 'contacts');

/**
 * Busca todos os contactos da coleção.
 * @returns {Promise<Array<object>>} Uma promessa que resolve para uma lista de contactos.
 */
export const getAllContacts = async () => {
    const querySnapshot = await getDocs(contactsCollectionRef);
    // Mapeia os documentos retornados para um formato mais utilizável, incluindo o ID de cada documento.
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return contacts;
};

/**
 * Adiciona um novo contacto à coleção.
 * @param {object} contact - O objeto do contacto a ser adicionado (ex: { name, email, phone }).
 * @returns {Promise<import('firebase/firestore').DocumentReference>} Uma promessa que resolve com a referência do novo documento.
 */
export const addContact = async (contact) => {
    return await addDoc(contactsCollectionRef, contact);
};

/**
 * Atualiza um contacto existente na coleção.
 * @param {string} id - O ID do documento do contacto a ser atualizado.
 * @param {object} contact - Um objeto com os campos a serem atualizados.
 * @returns {Promise<void>}
 */
export const updateContact = async (id, contact) => {
    const contactDoc = doc(db, 'contacts', id);
    return await updateDoc(contactDoc, contact);
};

/**
 * Apaga um contacto da coleção.
 * @param {string} id - O ID do documento do contacto a ser apagado.
 * @returns {Promise<void>}
 */
export const deleteContact = async (id) => {
    const contactDoc = doc(db, 'contacts', id);
    return await deleteDoc(contactDoc);
};

// Exporta a instância da base de dados para ser usada noutras partes da aplicação,
// como para configurar listeners em tempo real (onSnapshot).
export { db };
