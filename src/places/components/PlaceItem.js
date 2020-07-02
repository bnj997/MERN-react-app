import React, {useState} from 'react';

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import './PlaceItem.css';

function PlaceItem(props) {

  //DEALS WITH THE MAP MODAL
  const [showMap, setShowMap] = useState(false);
  function openMap() {
    setShowMap(true);
  }
  function closeMap() {
    setShowMap(false);
  }



  //DEALS WITH THE DELETE MODAL
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  function showDeleteWarning() {
    setShowConfirmModal(true)
  }
  function cancelDelete() {
    setShowConfirmModal(false)
  }
  function confirmDelete() {
    console.log('DELETE');
  }



  return (
    <React.Fragment>
      {/*THE MAP MODAL */}
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}> CLOSE </Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>


      {/*THE DELETE MODAL */}
      <Modal 
        show={showConfirmModal}
        onCancel={cancelDelete}
        header="Are you sure?" 
        footerClass="place-item__modal-actions" 
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDelete}> CANCEL </Button>
            <Button danger onClick={confirmDelete}> DELETE </Button>
          </React.Fragment>
        }
      >
       <p>Are you sure you want to delete this place?</p>
      </Modal>


      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title} </h2>
            <h3>{props.address} </h3>
            <p>{props.description} </p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>VIEW ON MAP </Button>
            <Button to={`/places/${props.id}`}>EDIT </Button>
            <Button danger onClick={showDeleteWarning}>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
