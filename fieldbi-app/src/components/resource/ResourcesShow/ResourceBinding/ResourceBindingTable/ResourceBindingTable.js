import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OutputNumber from '../../../../UI/OutputNumber';
import { COLORS } from '../../../../../constants';
import screens from '../../../../../navigation/screens';

const Table = ({ children }) => <View style={styles.table}>{children}</View>;

const Row = ({ children, style }) => <View style={[styles.row, style]}>{children}</View>;

const Col = ({ children, style }) => <View style={[styles.col, style]}>{children}</View>;

const ResourceBindingTable = props => {
  const { data, totalArea, totalAreaPercent, nameOneLine, intersectionResourceName } = props;

  const { push } = useNavigation();

  return (
    <Table>
      <Row>
        <Col style={styles.name}>
          <Text>{i18n.t('binding.bindingWith')}</Text>
        </Col>
        <Col style={styles.value}>
          <Text>
            {i18n.t('binding.area', {
              unit: i18n.t('generals.areaUnits')
            })}
          </Text>
        </Col>
        <Col style={styles.value}>
          <Text>
            {i18n.t('binding.area', {
              unit: '%'
            })}
          </Text>
        </Col>
      </Row>
      {data.map((row, index) => {
        const { name, area, areaPercentage } = row;
        const hasBackground = index % 2 === 0;

        return (
          <Row style={hasBackground && styles.background} key={row.key}>
            <Col style={styles.name}>
              <TouchableOpacity
                onPress={() => {
                  push(screens.LandBankShow, {
                    title: name,
                    resourceName: intersectionResourceName,
                    entitieId: row.id
                  });
                }}
              >
                <Text
                  numberOfLines={nameOneLine ? 1 : undefined}
                  ellipsizeMode="head"
                  style={[styles.td, { color: COLORS.MAIN }]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            </Col>
            <Col style={styles.value}>
              <Text style={styles.td}>{area}</Text>
            </Col>
            <Col style={styles.value}>
              <Text style={styles.td}>{areaPercentage}</Text>
            </Col>
          </Row>
        );
      })}
      <Row style={data.length % 2 === 0 && styles.background}>
        <Col style={styles.name}>
          <Text>{i18n.t('binding.sum')}</Text>
        </Col>
        <Col style={styles.value}>
          <Text>
            <OutputNumber value={totalArea} />
          </Text>
        </Col>
        <Col style={styles.value}>
          <Text>
            <OutputNumber value={totalAreaPercent} />
          </Text>
        </Col>
      </Row>
    </Table>
  );
};

const styles = StyleSheet.create({
  table: {
    paddingVertical: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: '#fff'
  },
  background: {
    backgroundColor: COLORS.GREY_BG
  },
  col: {
    paddingHorizontal: 10
  },
  headTd: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16
  },
  tdText: {
    fontSize: 14,
    lineHeight: 16
  },
  name: {
    flex: 1
  },
  value: {
    textAlign: 'center',
    width: 100,
    alignItems: 'center'
  }
});

ResourceBindingTable.propTypes = {
  data: PropTypes.array.isRequired,
  totalArea: PropTypes.number.isRequired,
  totalAreaPercent: PropTypes.number.isRequired,
  nameOneLine: PropTypes.bool,
  intersectionResourceName: PropTypes.string.isRequired
};

export default ResourceBindingTable;
