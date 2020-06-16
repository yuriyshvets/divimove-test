import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import { Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import UsersTable from '../../components/UsersTable';
import { useDispatch } from 'react-redux';
import { addUserAsync, getUsersAsync } from '../../store/actions';
import FormDialog from '../../components/FormDialog';
import './index.scss';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const handleAddUser = (values) => {
    dispatch(addUserAsync(values));
  };

  return (
    <>
      <div className="add-button-container">
        <Container maxWidth="lg">
          <Fab color="secondary" onClick={() => setShowModal(true)}>
            <AddIcon />
          </Fab>

          <FormDialog
            show={showModal}
            mode="add"
            onSubmit={handleAddUser}
            onClose={() => setShowModal(false)}
          />
        </Container>
      </div>

      <Container maxWidth="lg">
        <h1>Users</h1>

        <UsersTable />
      </Container>
    </>
  );
};

export default Home;
