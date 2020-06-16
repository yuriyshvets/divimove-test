import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './index.scss';
import { AddUserInputs, User } from '../../types/users';
import { requestLookupUsers } from '../../api/users';
import _ from 'underscore';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

interface Props {
  mode: 'edit' | 'add';
  show: boolean;
  onSubmit: (values: AddUserInputs) => void;
  onClose: () => void;
  user?: User;
}

const FormDialog: React.FC<Props> = ({ show, mode, onSubmit, onClose, user }) => {
  const [peers, setPeers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedPeers, setSelectedPeers] = useState([]);

  const resetState = () => {
    setPeers([]);
    setSearchText('');
    setSelectedPeers([]);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      formik.resetForm();
      const payload = {
        peer_ids: selectedPeers.map((peer) => peer.id),
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        ...(user ? { id: user.id } : {}),
      };
      onSubmit(payload);
      handleClose();
    },
    validationSchema,
  });

  useEffect(() => {
    if (show) {
      formik.setValues({
        email: user?.email,
        firstName: user?.first_name,
        lastName: user?.last_name,
      });
      setSelectedPeers(user?.peers || []);
    }
  }, [show]);

  const handleSubmit = () => {
    formik.submitForm();
  };

  const lookupUsers = async (value, user) => {
    const data = await requestLookupUsers(value);
    const items = data.data || [];

    const filteredPeers = items.filter(
      (peer) => !selectedPeers.find((i) => i.id === peer.id) && peer.id !== user?.id,
    );
    setPeers(filteredPeers || []);
  };

  const debauncedLookupUsers = useCallback(_.debounce(lookupUsers, 1000), []);

  const handleSearch = async (e) => {
    if (!e?.target) {
      return;
    }
    const { value } = e.target;
    setSearchText(value);
    debauncedLookupUsers(value, user);
  };

  const handlePeerSelect = (e, value) => {
    if (!value) {
      return;
    }
    setPeers([]);
    setSearchText('');
    setSelectedPeers([...selectedPeers, value]);
  };

  const handlePeerDelete = (id: number) => {
    setSelectedPeers([...selectedPeers.filter((peer) => peer.id !== id)]);
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle> {mode === 'add' ? 'Add user' : 'Edit user'}</DialogTitle>

      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={!!(formik.touched.firstName && formik.errors.firstName)}
            id="firstName"
            label="First name"
            helperText={formik.errors.firstName}
            variant="outlined"
          />

          <TextField
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={!!(formik.touched.lastName && formik.errors.lastName)}
            id="lastName"
            label="Last name"
            helperText={formik.errors.lastName}
            variant="outlined"
          />

          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            error={!!(formik.touched.email && formik.errors.email)}
            id="email"
            label="Email"
            helperText={formik.errors.email}
            variant="outlined"
          />

          <Autocomplete
            id="combo-box-demo"
            options={peers}
            onChange={handlePeerSelect}
            getOptionLabel={({ first_name, last_name, email }) =>
              email ? `${first_name} ${last_name} (${email})` : ''
            }
            inputValue={searchText}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Peers"
                variant="outlined"
                helperText="Search the peers by email"
                onChange={handleSearch}
              />
            )}
          />

          {selectedPeers?.map((peer) => (
            <Chip
              label={`${peer.first_name} ${peer.last_name}`}
              onDelete={() => handlePeerDelete(peer.id)}
              key={peer.id}
            />
          ))}
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {mode === 'add' ? 'Add user' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
