import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AgreementListItem from '../../agreements/AgreementList/AgreementListItem';
import ResourcesListFooter from '../../../components/resource/ResourcesList/ResourcesListFooter';
import AppLoader from '../../../components/AppLoader';
import Empty from '../../../components/Empty';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';
import { useEntities } from '../../../hooks';
import AppTouchableFeedback from '../../../components/AppTouchableFeedback';
import screens from '../../../navigation/screens';

const CounterpartiesShowAgreements = props => {
  const {
    entitie: { id }
  } = props;

  const {
    entities,
    loadEntities,
    loading,
    loadMoreEntities,
    refreshEntities,
    refreshing,
    isLoadMorePossible
  } = useEntities();

  const { push } = useNavigation();

  const URI = '/api/v1/agreements/find-counterparty-agreements';

  const params = {
    'filterBy[]': { agreementsCounterparty: id }
  };

  useEffect(() => loadEntities(URI, params), []);

  const renderItem = item => (
    <AppTouchableFeedback
      onPress={() => {
        push(screens.LandBankShow, {
          title: item.agreementNumber,
          resourceName: 'agreements',
          entitieId: item.id
        });
      }}
    >
      <AgreementListItem entitie={item} />
    </AppTouchableFeedback>
  );

  const listEmptyComponent = () => {
    if (loading) {
      return <AppLoader />;
    }

    return <Empty description={i18n.t('agreement.notFound')} />;
  };

  return (
    <FlatList
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      data={entities}
      ListEmptyComponent={listEmptyComponent}
      keyExtractor={item => item.id.toString()}
      refreshing={refreshing}
      onRefresh={() => refreshEntities(URI, params)}
      onEndReached={() => loadMoreEntities(URI, params)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => <ResourcesListFooter show={isLoadMorePossible} />}
      renderItem={({ item }) => renderItem(item)}
    />
  );
};

CounterpartiesShowAgreements.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(CounterpartiesShowAgreements, {
  scrollable: false
});
