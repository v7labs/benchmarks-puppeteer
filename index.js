const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 4445, path: "/socket/websocket" });

let mockSocket

wss.on('connection', socket => {
  mockSocket = socket;

  socket.on('message', (msg) => {
      const [join_ref, ref, topic, event] = JSON.parse(msg);

      const response = (join_ref, ref, topic, event, payload) => {
          socket.send(JSON.stringify([
              join_ref || null,
              ref || null,
              topic || null,
              event || null,
              payload || null
          ]))
      }

      if (topic === 'dataset_v2:1' && event === 'phx_join') { 
          response(join_ref, ref, topic, 'phx_reply', {"response":{},"status":"ok"})
          return
      }
      if (topic === 'dataset:1' && event === 'phx_join') {
          response(join_ref, ref, topic, 'phx_reply', {"response":{},"status":"ok"})
          return
      }
      if (topic === 'phoenix' && event === 'heartbeat') {
          response(join_ref, ref, topic, 'phx_reply', {"response":{},"status":"ok"})
          return
      }
      if (topic.startsWith('workflow_item:1:') && event === 'phx_join') {
          response(join_ref, ref, topic, "phx_reply", {"response":{},"status":"ok"})
          setTimeout(() => {
          response(join_ref, null, topic, 'workflow_item:state', {
              "state": {
                  "current_stage_instances": [
                      {
                          "data":
                          {
                              "active_edge": null, "annotations_count": null, "delete_annotations_snapshot_id": null, "exit_snapshot_id": null, "exited_at": null, "scheduled_to_complete_at": null, "skipped": false, "skipped_reason": null, "snapshots": []
                          },
                          "id": "2b163d00-ee39-4cef-8c33-a2da16d3d9c0",
                          "item_id": "0186ff1b-60d1-29db-66dd-98cbdb9cf21a",
                          "model_id": null,
                          "stage": {
                              "assignable_users": [],
                              "config": {
                                  "annotation_group_id": null,
                                  "assignable_to": "anyone",
                                  "authorization_header": null,
                                  "auto_instantiate": false,
                                  "champion_stage_id": null,
                                  "class_mapping": [],
                                  "dataset_id": 1,
                                  "from_non_default_v1_template": null,
                                  "include_annotations": false,
                                  "initial": true,
                                  "iou_thresholds": null,
                                  "model_id": null,
                                  "parallel_stage_ids": null,
                                  "readonly": false,
                                  "retry_if_fails": false,
                                  "rules": [],
                                  "skippable": true,
                                  "test_stage_id": null,
                                  "threshold": null,
                                  "url": null,
                                  "x": 2200,
                                  "y": 2650
                              },
                              "edges": [{ "id": "f732ba5f-9ac2-42d4-a2cd-a46e1e85712b", "name": "default", "source_stage_id": "0f0f6ac5-faf7-43d3-86af-5293e95f92d4", "target_stage_id": "239ed040-4527-4dc6-86fa-bd455db6a724" }], "id": "0f0f6ac5-faf7-43d3-86af-5293e95f92d4", "name": "Dataset", "type": "dataset"
                          },
                          "stage_id": "0f0f6ac5-faf7-43d3-86af-5293e95f92d4",
                          "status": "current",
                          "user_id": null
                      }
                  ],
                  "designated_assignees": {},
                  "item_id": "0186ff1b-60d1-29db-66dd-98cbdb9cf21a",
                  "previous_stage_instances": [],
                  "workflow": {
                      "id": "2eac2af2-21e1-4e0a-ac93-61ddd7f6b3ff",
                      "inserted_at": "2023-03-20T13:00:29",
                      "name": "Dataset-Annotate-Review-Complete",
                      "stages": [
                          {
                              "assignable_users": [],
                              "config": { "annotation_group_id": null, "assignable_to": "anyone", "authorization_header": null, "auto_instantiate": false, "champion_stage_id": null, "class_mapping": [], "dataset_id": 1, "from_non_default_v1_template": null, "include_annotations": false, "initial": true, "iou_thresholds": null, "model_id": null, "parallel_stage_ids": null, "readonly": false, "retry_if_fails": false, "rules": [], "skippable": true, "test_stage_id": null, "threshold": null, "url": null, "x": 2200, "y": 2650 }, "edges": [{ "id": "f732ba5f-9ac2-42d4-a2cd-a46e1e85712b", "name": "default", "source_stage_id": "0f0f6ac5-faf7-43d3-86af-5293e95f92d4", "target_stage_id": "239ed040-4527-4dc6-86fa-bd455db6a724" }], "id": "0f0f6ac5-faf7-43d3-86af-5293e95f92d4", "name": "Dataset", "type": "dataset"
                          }, {
                              "assignable_users": [], "config": { "annotation_group_id": null, "assignable_to": "anyone", "authorization_header": null, "auto_instantiate": false, "champion_stage_id": null, "class_mapping": [], "dataset_id": null, "from_non_default_v1_template": null, "include_annotations": false, "initial": false, "iou_thresholds": null, "model_id": null, "parallel_stage_ids": null, "readonly": false, "retry_if_fails": false, "rules": [], "skippable": true, "test_stage_id": null, "threshold": null, "url": null, "x": 2450, "y": 2650 }, "edges": [{ "id": "825e3c4b-2d9c-4be9-baf0-39b2ae2c03c4", "name": "default", "source_stage_id": "239ed040-4527-4dc6-86fa-bd455db6a724", "target_stage_id": "e64cf17e-4864-4d5c-93ce-9e3feb0c477c" }], "id": "239ed040-4527-4dc6-86fa-bd455db6a724", "name": "Annotate", "type": "annotate"
                          }, {
                              "assignable_users": [], "config": { "annotation_group_id": null, "assignable_to": "anyone", "authorization_header": null, "auto_instantiate": false, "champion_stage_id": null, "class_mapping": [], "dataset_id": null, "from_non_default_v1_template": null, "include_annotations": false, "initial": false, "iou_thresholds": null, "model_id": null, "parallel_stage_ids": null, "readonly": false, "retry_if_fails": false, "rules": [], "skippable": true, "test_stage_id": null, "threshold": null, "url": null, "x": 2650, "y": 2650 }, "edges": [{ "id": "66558769-239b-49a9-a16d-fca985bfdfa8", "name": "approve", "source_stage_id": "e64cf17e-4864-4d5c-93ce-9e3feb0c477c", "target_stage_id": "d6c79d6f-cbdc-4b28-bbb2-b8b8d17aeca5" }, { "id": "cbc1b662-32e7-4768-b5bf-a1b7b8ed9d19", "name": "reject", "source_stage_id": "e64cf17e-4864-4d5c-93ce-9e3feb0c477c", "target_stage_id": "239ed040-4527-4dc6-86fa-bd455db6a724" }], "id": "e64cf17e-4864-4d5c-93ce-9e3feb0c477c", "name": "Review", "type": "review"
                          }, {
                              "assignable_users": [], "config": { "annotation_group_id": null, "assignable_to": "anyone", "authorization_header": null, "auto_instantiate": false, "champion_stage_id": null, "class_mapping": [], "dataset_id": null, "from_non_default_v1_template": null, "include_annotations": false, "initial": false, "iou_thresholds": null, "model_id": null, "parallel_stage_ids": null, "readonly": false, "retry_if_fails": false, "rules": [], "skippable": true, "test_stage_id": null, "threshold": null, "url": null, "x": 2850, "y": 2650 }, "edges": [], "id": "d6c79d6f-cbdc-4b28-bbb2-b8b8d17aeca5", "name": "Complete", "type": "complete"
                          }, {
                              "assignable_users": [], "config": { "annotation_group_id": null, "assignable_to": "anyone", "authorization_header": null, "auto_instantiate": false, "champion_stage_id": null, "class_mapping": [], "dataset_id": null, "from_non_default_v1_template": null, "include_annotations": false, "initial": false, "iou_thresholds": null, "model_id": null, "parallel_stage_ids": null, "readonly": false, "retry_if_fails": false, "rules": [], "skippable": true, "test_stage_id": null, "threshold": null, "url": null, "x": null, "y": null }, "edges": [], "id": "5a49611f-eb36-4e0b-ba4f-24b9068e2b73", "name": "Discard", "type": "discard"
                          }],
                      "team_id": 1,
                      "updated_at": "2023-03-20T13:00:29"
                  }
              }
          })
          }, 4000)
          return
      }
      if (topic.startsWith('workview_v2:annotate:item:1:') && event === 'phx_join') {
          response(join_ref, ref, topic, "phx_reply", {"response":{},"status":"ok"})
          response(join_ref, null, topic, "workview:time", {"time":0})
          return
      }

      if (topic.startsWith('workview_v2:annotate:item:1:') && event === 'workview:unpause') {
          response(join_ref, null, topic, 'workview:time', { time: 2 })
          response(join_ref, ref, topic, 'phx_reply', {"response":{},"status":"ok"})
          return
      }

      if (topic.startsWith('workview_v2:annotate:item:1:') && event === 'workview:pause') {
          response(join_ref, null, topic, 'workview:time', { time: 3 })
          response(join_ref, ref, topic, 'phx_reply', {"response":{},"status":"ok"})
          return
      }
  });
  socket.on('close', () => {
  });
  socket.on('error', (err) => {
      console.log('Error', err)
  });
});