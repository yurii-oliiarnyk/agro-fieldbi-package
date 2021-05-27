import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import AppTouchableFeedback from '../../../../components/AppTouchableFeedback';
import { getPlateState, setPlateState } from './utils';

const TaskboardPlate = props => {
  const { children, title, subtitle, value, valueUnit, color, id } = props;

  const [collapsed, setCollapsed] = useState(true);

  const loadState = async () => {
    const state = await getPlateState(id);
    setCollapsed(!!state);
  };

  useEffect(() => {
    loadState();
  }, []);

  const onPressHandler = () => {
    setCollapsed(collapsed => {
      setPlateState(id, !collapsed);
      return !collapsed;
    });
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <AppTouchableFeedback
        style={{
          backgroundColor: color,
          padding: 12,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 1
        }}
        onPress={() => onPressHandler()}
      >
        <View>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View>
            <Text style={{ color: '#fff' }}>{`${subtitle}:`}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#fff' }}>
              <Text style={{ fontSize: 30 }}>{value}</Text>
              {valueUnit && <Text style={{ fontSize: 12 }}>{` ${valueUnit}`}</Text>}
            </Text>
          </View>
        </View>
      </AppTouchableFeedback>
      {!collapsed && <View style={{ backgroundColor: '#fff', padding: 12 }}>{children}</View>}
    </View>
  );
};

TaskboardPlate.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valueUnit: PropTypes.string,
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default TaskboardPlate;
