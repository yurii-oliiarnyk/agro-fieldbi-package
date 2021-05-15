import React, { useState, useCallback } from 'react';
import { FullScreenModal } from '../../../UI/FullScreenModal';
import { ScoutingReportsSelectButton } from './ScoutingReportsSelectButton';
import { ScoutingReportsSelectBody } from './ScoutingReportsSelectBody';

type ScoutingReportsSelectProps = {
  name: string;
  onSave: (ids: number[]) => void;
  loading?: boolean;
  disabledItems?: number[];
  apiUrl: string;
};

export const ScoutingReportsSelect: React.FC<ScoutingReportsSelectProps> = props => {
  const { name, onSave, loading, apiUrl, disabledItems } = props;

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const onPressHandler = useCallback((id: number) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter(selectedItem => selectedItem !== id);
      }

      return [...prevSelectedItems, id];
    });
  }, []);

  const onSaveHandler = () => {
    onSave(selectedItems);
    setSelectedItems([]);
  };

  return (
    <FullScreenModal
      button={<ScoutingReportsSelectButton loading={loading} name={name} />}
      headerTitle={name}
      save={selectedItems.length > 0 ? onSaveHandler : undefined}
    >
      <ScoutingReportsSelectBody
        apiUrl={apiUrl}
        onPress={onPressHandler}
        selectedItems={selectedItems}
        disabledItems={disabledItems}
      />
    </FullScreenModal>
  );
};
