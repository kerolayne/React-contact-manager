import React from 'react';

// Um componente de modal genérico para confirmações.
function ConfirmModal({ isOpen, onClose, onConfirm, title, children }) {
  // Se o modal não estiver aberto, não renderiza nada.
  if (!isOpen) {
    return null;
  }

  return (
    // O overlay escurece o fundo da página. Clicar nele fecha o modal.
    <div className="modal-overlay" onClick={onClose}>
      {/* Impede que o clique no conteúdo do modal feche o modal. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{children}</p>
        <div className="modal-buttons">
          {/* Botão para cancelar a ação e fechar o modal. */}
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          {/* Botão para confirmar a ação. */}
          <button onClick={onConfirm} className="btn-danger">
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
