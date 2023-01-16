"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridScroll = void 0;

var React = _interopRequireWildcard(require("react"));

var _useGridLogger = require("../../utils/useGridLogger");

var _gridColumnsSelector = require("../columns/gridColumnsSelector");

var _useGridSelector = require("../../utils/useGridSelector");

var _gridPaginationSelector = require("../pagination/gridPaginationSelector");

var _gridRowsSelector = require("../rows/gridRowsSelector");

var _gridRowsMetaSelector = require("../rows/gridRowsMetaSelector");

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _gridFilterSelector = require("../filter/gridFilterSelector");

var _gridClasses = require("../../../constants/gridClasses");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
// Similar to https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
function scrollIntoView(dimensions) {
  const {
    clientHeight,
    scrollTop,
    offsetHeight,
    offsetTop
  } = dimensions;
  const elementBottom = offsetTop + offsetHeight; // Always scroll to top when cell is higher than viewport to avoid scroll jump
  // See https://github.com/mui/mui-x/issues/4513 and https://github.com/mui/mui-x/issues/4514

  if (offsetHeight > clientHeight) {
    return offsetTop;
  }

  if (elementBottom - clientHeight > scrollTop) {
    return elementBottom - clientHeight;
  }

  if (offsetTop < scrollTop) {
    return offsetTop;
  }

  return undefined;
}
/**
 * @requires useGridPagination (state) - can be after, async only
 * @requires useGridColumns (state) - can be after, async only
 * @requires useGridRows (state) - can be after, async only
 * @requires useGridRowsMeta (state) - can be after, async only
 * @requires useGridFilter (state)
 * @requires useGridColumnSpanning (method)
 */


const useGridScroll = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridScroll');
  const colRef = apiRef.current.columnHeadersElementRef;
  const windowRef = apiRef.current.windowRef;
  const visibleSortedRows = (0, _useGridSelector.useGridSelector)(apiRef, _gridFilterSelector.gridVisibleSortedRowEntriesSelector);
  const scrollToIndexes = React.useCallback(params => {
    const totalRowCount = (0, _gridRowsSelector.gridRowCountSelector)(apiRef);
    const visibleColumns = (0, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector)(apiRef);
    const scrollToHeader = params.rowIndex == null;

    if (!scrollToHeader && totalRowCount === 0 || visibleColumns.length === 0) {
      return false;
    }

    logger.debug(`Scrolling to cell at row ${params.rowIndex}, col: ${params.colIndex} `);
    let scrollCoordinates = {};

    if (params.colIndex != null) {
      const columnPositions = (0, _gridColumnsSelector.gridColumnPositionsSelector)(apiRef);
      let cellWidth;

      if (typeof params.rowIndex !== 'undefined') {
        var _visibleSortedRows$pa;

        const rowId = (_visibleSortedRows$pa = visibleSortedRows[params.rowIndex]) == null ? void 0 : _visibleSortedRows$pa.id;
        const cellColSpanInfo = apiRef.current.unstable_getCellColSpanInfo(rowId, params.colIndex);

        if (cellColSpanInfo && !cellColSpanInfo.spannedByColSpan) {
          cellWidth = cellColSpanInfo.cellProps.width;
        }
      }

      if (typeof cellWidth === 'undefined') {
        cellWidth = visibleColumns[params.colIndex].computedWidth;
      }

      scrollCoordinates.left = scrollIntoView({
        clientHeight: windowRef.current.clientWidth,
        scrollTop: windowRef.current.scrollLeft,
        offsetHeight: cellWidth,
        offsetTop: columnPositions[params.colIndex]
      });
    }

    if (params.rowIndex != null) {
      var _querySelector, _querySelector2;

      const rowsMeta = (0, _gridRowsMetaSelector.gridRowsMetaSelector)(apiRef.current.state);
      const page = (0, _gridPaginationSelector.gridPageSelector)(apiRef);
      const pageSize = (0, _gridPaginationSelector.gridPageSizeSelector)(apiRef);
      const elementIndex = !props.pagination ? params.rowIndex : params.rowIndex - page * pageSize;
      const targetOffsetHeight = rowsMeta.positions[elementIndex + 1] ? rowsMeta.positions[elementIndex + 1] - rowsMeta.positions[elementIndex] : rowsMeta.currentPageTotalHeight - rowsMeta.positions[elementIndex];
      const topPinnedRowsHeight = ((_querySelector = windowRef.current.querySelector(`.${_gridClasses.gridClasses['pinnedRows--top']}`)) == null ? void 0 : _querySelector.clientHeight) || 0;
      const bottomPinnedRowsHeight = ((_querySelector2 = windowRef.current.querySelector(`.${_gridClasses.gridClasses['pinnedRows--bottom']}`)) == null ? void 0 : _querySelector2.clientHeight) || 0;
      scrollCoordinates.top = scrollIntoView({
        clientHeight: windowRef.current.clientHeight - topPinnedRowsHeight - bottomPinnedRowsHeight,
        scrollTop: windowRef.current.scrollTop,
        offsetHeight: targetOffsetHeight,
        offsetTop: rowsMeta.positions[elementIndex]
      });
    }

    scrollCoordinates = apiRef.current.unstable_applyPipeProcessors('scrollToIndexes', scrollCoordinates, params);

    if (typeof scrollCoordinates.left !== undefined || typeof scrollCoordinates.top !== undefined) {
      apiRef.current.scroll(scrollCoordinates);
      return true;
    }

    return false;
  }, [logger, apiRef, windowRef, props.pagination, visibleSortedRows]);
  const scroll = React.useCallback(params => {
    if (windowRef.current && params.left != null && colRef.current) {
      colRef.current.scrollLeft = params.left;
      windowRef.current.scrollLeft = params.left;
      logger.debug(`Scrolling left: ${params.left}`);
    }

    if (windowRef.current && params.top != null) {
      windowRef.current.scrollTop = params.top;
      logger.debug(`Scrolling top: ${params.top}`);
    }

    logger.debug(`Scrolling, updating container, and viewport`);
  }, [windowRef, colRef, logger]);
  const getScrollPosition = React.useCallback(() => {
    if (!(windowRef != null && windowRef.current)) {
      return {
        top: 0,
        left: 0
      };
    }

    return {
      top: windowRef.current.scrollTop,
      left: windowRef.current.scrollLeft
    };
  }, [windowRef]);
  const scrollApi = {
    scroll,
    scrollToIndexes,
    getScrollPosition
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, scrollApi, 'GridScrollApi');
};

exports.useGridScroll = useGridScroll;