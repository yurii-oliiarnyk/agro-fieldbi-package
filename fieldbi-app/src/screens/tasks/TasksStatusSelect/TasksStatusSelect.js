import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { statusOptions, getCurrentStatus } from '../config';
import { updateResourceSuccess } from '../../../store/resource/resource';
import axios from '../../../axios/axios';
import AppModal from '../../../components/UI/AppModal';
import AppTouchableFeedback from '../../../components/AppTouchableFeedback';
import AppRadioButtonGroup from '../../../components/UI/AppRadioButtonGroup';
import { VARIABLES } from '../../../constants';

const TasksStatusSelect = props => {
  const { value, id } = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const saveChangedTask = entity => {
    dispatch(updateResourceSuccess('tasks')(entity));
  };

  const onChangeHandler = value => {
    setLoading(true);

    axios
      .put(`/api/v1/tasks/${id}/update-property`, {
        property: 'status',
        value
      })
      .then(response => response.data.data)
      .then(task => saveChangedTask(task))
      .then(() => {
        setVisible(false);
        showMessage({
          message: i18n.t('tasks.status.success'),
          type: 'success'
        });
      })
      .catch(() =>
        showMessage({
          message: i18n.t('tasks.status.failed'),
          type: 'danger'
        })
      )
      .finally(() => setLoading(false));
  };

  const dispatch = useDispatch();

  const currentStatus = getCurrentStatus(value);

  return (
    <>
      <AppTouchableFeedback style={styles.select} onPress={() => setVisible(true)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              ...styles.selectPoint,
              backgroundColor: currentStatus.color
            }}
          />
          <Text>{currentStatus.label}</Text>
        </View>
        <Icon name="chevron-down" {...VARIABLES.inputIcon} style={styles.icon} />
      </AppTouchableFeedback>
      <AppModal visible={visible} setVisible={setVisible} loading={loading}>
        <AppModal.Title>{i18n.t('tasks.status.choose')}</AppModal.Title>
        <AppModal.Content>
          <AppRadioButtonGroup
            active={value}
            onChangeHandler={onChangeHandler}
            values={statusOptions}
          />
        </AppModal.Content>
      </AppModal>
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderColor: '#909090'
  },
  selectPoint: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginRight: 6
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 2,
    flexDirection: 'row'
  }
});

TasksStatusSelect.propTypes = {
  value: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

export default TasksStatusSelect;
