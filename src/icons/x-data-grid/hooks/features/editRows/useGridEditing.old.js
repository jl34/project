import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridCellModes } from '../../../models/gridEditRowModel';
import { useGridApiEventHandler, useGridApiOptionHandler } from '../../utils/useGridApiEventHandler';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridEditRowsStateSelector } from './gridEditRowsSelector';
import { useCellEditing } from './useGridCellEditing.old';
import { useGridRowEditing } from './useGridRowEditing.old';
export const editingStateInitializer = state => _extends({}, state, {
  editRows: {}
});
/**
 * @requires useGridFocus - can be after, async only
 * @requires useGridParamsApi (method)
 * @requires useGridColumns (state)
 */

export function useGridEditing(apiRef, props) {
  var _props$experimentalFe2;

  const logger = useGridLogger(apiRef, 'useGridEditRows');
  useCellEditing(apiRef, props);
  useGridRowEditing(apiRef, props);
  const debounceMap = React.useRef({});
  apiRef.current.unstable_registerControlState({
    stateId: 'editRows',
    propModel: props.editRowsModel,
    propOnChange: props.onEditRowsModelChange,
    stateSelector: gridEditRowsStateSelector,
    changeEvent: 'editRowsModelChange'
  });
  const isCellEditable = React.useCallback(params => !params.rowNode.isAutoGenerated && !params.rowNode.isPinned && !!params.colDef.editable && !!params.colDef.renderEditCell && (!props.isCellEditable || props.isCellEditable(params)), // eslint-disable-next-line react-hooks/exhaustive-deps
  [props.isCellEditable]);

  const maybeDebounce = (id, field, debounceMs, callback) => {
    if (!debounceMs) {
      callback();
      return;
    }

    if (!debounceMap.current[id]) {
      debounceMap.current[id] = {};
    }

    if (debounceMap.current[id][field]) {
      const [timeout] = debounceMap.current[id][field];
      clearTimeout(timeout);
    }

    const callbackToRunImmediately = () => {
      callback();
      const [timeout] = debounceMap.current[id][field];
      clearTimeout(timeout);
      delete debounceMap.current[id][field];
    };

    const timeout = setTimeout(() => {
      callback();
      delete debounceMap.current[id][field];
    }, debounceMs);
    debounceMap.current[id][field] = [timeout, callbackToRunImmediately];
  };

  const runPendingEditCellValueMutation = React.useCallback((id, field) => {
    if (!debounceMap.current[id]) {
      return;
    }

    if (!field) {
      Object.keys(debounceMap.current[id]).forEach(debouncedField => {
        const [, callback] = debounceMap.current[id][debouncedField];
        callback();
      });
    } else if (debounceMap.current[id][field]) {
      const [, callback] = debounceMap.current[id][field];
      callback();
    }
  }, []);
  const setEditCellValue = React.useCallback((params, event = {}) => {
    maybeDebounce(params.id, params.field, params.debounceMs, () => {
      var _props$experimentalFe;

      if ((_props$experimentalFe = props.experimentalFeatures) != null && _props$experimentalFe.preventCommitWhileValidating) {
        if (props.editMode === 'row') {
          return apiRef.current.unstable_setRowEditingEditCellValue(params);
        }

        return apiRef.current.unstable_setCellEditingEditCellValue(params);
      }

      const newParams = {
        id: params.id,
        field: params.field,
        props: {
          value: params.value
        }
      };
      return apiRef.current.publishEvent('editCellPropsChange', newParams, event);
    });
  }, [apiRef, props.editMode, (_props$experimentalFe2 = props.experimentalFeatures) == null ? void 0 : _props$experimentalFe2.preventCommitWhileValidating]);
  const parseValue = React.useCallback((id, field, value) => {
    const column = apiRef.current.getColumn(field);
    return column.valueParser ? column.valueParser(value, apiRef.current.getCellParams(id, field)) : value;
  }, [apiRef]);
  const setEditCellProps = React.useCallback(params => {
    const {
      id,
      field,
      props: editProps
    } = params;
    logger.debug(`Setting cell props on id: ${id} field: ${field}`);
    apiRef.current.setState(state => {
      const editRowsModel = _extends({}, state.editRows);

      editRowsModel[id] = _extends({}, state.editRows[id]);
      editRowsModel[id][field] = _extends({}, editProps, {
        value: parseValue(id, field, editProps.value)
      });
      return _extends({}, state, {
        editRows: editRowsModel
      });
    });
    apiRef.current.forceUpdate();
    const editRowsState = gridEditRowsStateSelector(apiRef.current.state);
    return editRowsState[id][field];
  }, [apiRef, logger, parseValue]);
  const setEditRowsModel = React.useCallback(model => {
    const currentModel = gridEditRowsStateSelector(apiRef.current.state);

    if (currentModel !== model) {
      logger.debug(`Setting editRows model`);
      apiRef.current.setState(state => _extends({}, state, {
        editRows: model
      }));
      apiRef.current.forceUpdate();
    }
  }, [apiRef, logger]);
  const getEditRowsModel = React.useCallback(() => gridEditRowsStateSelector(apiRef.current.state), [apiRef]);
  const preventTextSelection = React.useCallback((params, event) => {
    const isMoreThanOneClick = event.detail > 1;

    if (params.isEditable && params.cellMode === GridCellModes.View && isMoreThanOneClick) {
      // If we click more than one time, then we prevent the default behavior of selecting the text cell.
      event.preventDefault();
    }
  }, []);
  useGridApiEventHandler(apiRef, 'cellMouseDown', preventTextSelection);
  useGridApiOptionHandler(apiRef, 'editCellPropsChange', props.onEditCellPropsChange); // TODO v6: remove, use `preProcessEditCellProps` instead

  const editingSharedApi = {
    isCellEditable,
    setEditRowsModel,
    getEditRowsModel,
    setEditCellValue,
    unstable_setEditCellProps: setEditCellProps,
    unstable_parseValue: parseValue,
    unstable_runPendingEditCellValueMutation: runPendingEditCellValueMutation
  };
  useGridApiMethod(apiRef, editingSharedApi, 'EditRowApi');
  React.useEffect(() => {
    if (props.editRowsModel !== undefined) {
      apiRef.current.setEditRowsModel(props.editRowsModel);
    }
  }, [apiRef, props.editRowsModel]);
}