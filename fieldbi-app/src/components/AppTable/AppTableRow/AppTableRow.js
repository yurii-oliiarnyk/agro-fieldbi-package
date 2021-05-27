import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import AppTouchableFeedback from '../../AppTouchableFeedback';

const AppTableRow = props => {
  const { row, columns, styles, level = 0 } = props;

  const [opened, setOpened] = useState(false);
  const { children } = row;

  const expandable = children && children.length > 0;

  const Wrapper = expandable ? AppTouchableFeedback : View;

  return (
    <>
      <Wrapper
        style={[styles.row, row.style]}
        onPress={() => setOpened(open => !open)}
        key={row.key}
      >
        {columns.map((column, index) => {
          const { render, key } = column;
          let value = row[key];

          value = typeof render === 'function' ? render(value) : value;

          return (
            <View
              key={column.key}
              style={{
                ...styles.column,
                ...column.style
              }}
            >
              <View
                style={{
                  paddingLeft: index === 0 ? level * 16 : 0,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                {index === 0 && expandable && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 4
                    }}
                  >
                    <Text style={{ fontSize: 14, lineHeight: 14 }}>{opened ? '-' : '+'}</Text>
                  </View>
                )}
                <Text style={{ ...styles.columnText, ...row.textStyle }}>{value}</Text>
              </View>
            </View>
          );
        })}
      </Wrapper>
      {expandable &&
        opened &&
        children.map(row => (
          <AppTableRow
            row={row}
            columns={columns}
            key={row.key}
            level={level + 1}
            styles={styles}
          />
        ))}
    </>
  );
};

AppTableRow.propTypes = {
  level: PropTypes.number,
  styles: PropTypes.shape({
    row: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    columnText: PropTypes.object.isRequired
  }),
  row: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.object,
    textStyle: PropTypes.object
  }).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      render: PropTypes.func
    })
  )
};

export default AppTableRow;
