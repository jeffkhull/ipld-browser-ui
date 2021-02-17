import { Point } from 'slate'
import * as model from '../../model'
// import { getPreceedingSpecialNodeId } from "./getPreceedingSpecialNodeId";

export function gatherPreceedingNodeInfo(
  editor: any,
  cursorPoint: Point,
  curData: model.CursorPostionData,
) {
  curData.nodeInfo.nodeDepth = cursorPoint.path.length
  /**
   * Preceeded by subject entity?
   */
  //   curData.nearbyNodesInfo.subjectEntityId = getPreceedingSpecialNodeId(
  //     editor,
  //     cursorPoint,
  //     model.NodeType.entity,
  //     2,
  //     true
  //   );

  /**
   * IF preceeded by relation, THEN what is the previous subject entity id
   */
}
