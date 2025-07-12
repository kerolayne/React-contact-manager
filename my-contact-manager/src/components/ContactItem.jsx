// src/components/ContactItem.jsx
import React from 'react';

function ContactItem({ contact, onEdit, onDelete }) {
  const { id, name, email, phone } = contact; // Desestrutura o objeto contact

  return (
    <div style={itemStyle}>
      <div style={infoStyle}>
        <h3 style={nameStyle}>{name}</h3>
        <p style={detailStyle}>Email: {email}</p>
        <p style={detailStyle}>Telefone: {phone}</p>
      </div>
      <div style={buttonGroupStyle}>
        {/* Futuramente, você pode ter um botão de edição aqui */}
        {/* <button onClick={() => onEdit(id)} style={{ ...buttonStyle, ...editButtonStyle }}>
          Editar
        </button> */}
        <button onClick={() => onDelete(id)} style={{ ...buttonStyle, ...deleteButtonStyle }}>
          Excluir
        </button>
      </div>
    </div>
  );
}

// Estilos para o ContactItem (pode ser movido para um arquivo CSS)
const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px 20px',
  marginBottom: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  maxWidth: '600px',
  margin: '10px auto',
};

const infoStyle = {
  flexGrow: 1,
};

const nameStyle = {
  margin: '0 0 5px 0',
  color: '#333',
};

const detailStyle = {
  margin: '0 0 3px 0',
  color: '#666',
  fontSize: '0.9em',
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '10px', // Espaço entre os botões
};

const buttonStyle = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.85em',
  transition: 'background-color 0.2s',
};

const editButtonStyle = {
  background: '#ffc107',
  color: 'white',
};

const deleteButtonStyle = {
  background: '#dc3545',
  color: 'white',
};


export default ContactItem;