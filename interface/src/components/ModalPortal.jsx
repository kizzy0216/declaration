// Import dynamically without SSR, as this is expected to be rendered clientside only
// e.g.  const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
//
// Expects an empty div with id of `modal-portal-root` somewhere in the DOM

import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import useKeyDown from '../hooks/useKeyDown';

function ModalPortal({ children, onClose }) {
  const $modalPortalRoot = useRef();
  const $el = useRef(document.createElement('div'));

  useEffect(() => {
    $modalPortalRoot.current = document.getElementById('modal-portal-root');
    $modalPortalRoot.current.appendChild($el.current);
    return () => $modalPortalRoot.current.removeChild($el.current);
  }, []);

  useKeyDown('Escape', onClose);

  const modalElement = (
    <div className="modal-portal">
      <div className="overlay" onClick={onClose} />
      {children}
      <style jsx>{`
        .modal-portal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          z-index: 9;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: var(--z-index-bottom);
        }
      `}</style>
    </div>
  );

  return createPortal(
    children && modalElement,
    $el.current,
  );
}

export default ModalPortal;
