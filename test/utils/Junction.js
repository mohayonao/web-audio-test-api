const assert = require("power-assert");
const Junction = require("../../src/utils/Junction");

describe("Junction", () => {
  describe("constructor(node: any, channel: number)", () => {
    it("works", () => {
      let junction = new Junction({}, 0);

      assert(junction instanceof Junction);
    });
  });
  describe("#connect(destination: Junction): void", () => {
    it("works", () => {
      /**
       *                  +-----------+
       *                  | node1 [0] |
       *                  +-----------+
       *                        |
       *                  +-----------+
       *                  | node2 [0] |
       *                  +-----------+
       *                        |
       *        +---------------+---------------+
       *        |               |               |
       *        |               |               |
       *  +-----------+   +-----------+   +-----------+
       *  | node3 [0] |   | node3 [1] |   | node4 [0] |
       *  +-----------+   +-----------+   +-----------+
       */
      let node1 = {}, junction1x0 = new Junction(node1, 0);
      let node2 = {}, junction2x0 = new Junction(node2, 0);
      let node3 = {}, junction3x0 = new Junction(node3, 0), junction3x1 = new Junction(node3, 1);
      let node4 = {}, junction4x0 = new Junction(node4, 0);

      junction1x0.connect(junction2x0);
      junction2x0.connect(junction3x0);
      junction2x0.connect(junction3x1);
      junction2x0.connect(junction4x0);

      assert.deepEqual(junction1x0.outputs, [ junction2x0 ]);
      assert.deepEqual(junction2x0.outputs, [ junction3x0, junction3x1, junction4x0 ]);
      assert.deepEqual(junction3x0.outputs, []);
      assert.deepEqual(junction3x1.outputs, []);
      assert.deepEqual(junction4x0.outputs, []);
      assert.deepEqual(junction1x0.inputs, []);
      assert.deepEqual(junction2x0.inputs, [ junction1x0 ]);
      assert.deepEqual(junction3x0.inputs, [ junction2x0 ]);
      assert.deepEqual(junction3x1.inputs, [ junction2x0 ]);
      assert.deepEqual(junction4x0.inputs, [ junction2x0 ]);
    });
  });
  describe("#disconnectAll(): void", () => {
    it("works", () => {
      /**
       *                  +-----------+
       *                  | node1 [0] |
       *                  +-----------+
       *                        |
       *                  +-----------+
       *                  | node2 [0] |
       *                  +-----------+
       *                        |
       *                        *
       *
       *
       *  +-----------+   +-----------+   +-----------+
       *  | node3 [0] |   | node3 [1] |   | node4 [0] |
       *  +-----------+   +-----------+   +-----------+
       */
      let node1 = {}, junction1x0 = new Junction(node1, 0);
      let node2 = {}, junction2x0 = new Junction(node2, 0);
      let node3 = {}, junction3x0 = new Junction(node3, 0), junction3x1 = new Junction(node3, 1);
      let node4 = {}, junction4x0 = new Junction(node4, 0);

      junction1x0.connect(junction2x0);
      junction2x0.connect(junction3x0);
      junction2x0.connect(junction3x1);
      junction2x0.connect(junction4x0);

      junction2x0.disconnectAll();

      assert.deepEqual(junction1x0.outputs, [ junction2x0 ]);
      assert.deepEqual(junction2x0.outputs, []);
      assert.deepEqual(junction3x0.outputs, []);
      assert.deepEqual(junction3x1.outputs, []);
      assert.deepEqual(junction4x0.outputs, []);
      assert.deepEqual(junction1x0.inputs, []);
      assert.deepEqual(junction2x0.inputs, [ junction1x0 ]);
      assert.deepEqual(junction3x0.inputs, []);
      assert.deepEqual(junction3x1.inputs, []);
      assert.deepEqual(junction4x0.inputs, []);
    });
  });
  describe("#disconnectNode(destination: any): void", () => {
    it("works", () => {
      /**
       *                  +-----------+
       *                  | node1 [0] |
       *                  +-----------+
       *                        |
       *                  +-----------+
       *                  | node2 [0] |
       *                  +-----------+
       *                        |
       *        +---------------+---------------+
       *        *               *               |
       *                                        |
       *  +-----------+   +-----------+   +-----------+
       *  | node3 [0] |   | node3 [1] |   | node4 [0] |
       *  +-----------+   +-----------+   +-----------+
       */
      let node1 = {}, junction1x0 = new Junction(node1, 0);
      let node2 = {}, junction2x0 = new Junction(node2, 0);
      let node3 = {}, junction3x0 = new Junction(node3, 0), junction3x1 = new Junction(node3, 1);
      let node4 = {}, junction4x0 = new Junction(node4, 0);

      junction1x0.connect(junction2x0);
      junction2x0.connect(junction3x0);
      junction2x0.connect(junction3x1);
      junction2x0.connect(junction4x0);

      junction2x0.disconnectNode(node3);

      assert.deepEqual(junction1x0.outputs, [ junction2x0 ]);
      assert.deepEqual(junction2x0.outputs, [ junction4x0 ]);
      assert.deepEqual(junction3x0.outputs, []);
      assert.deepEqual(junction3x1.outputs, []);
      assert.deepEqual(junction4x0.outputs, []);
      assert.deepEqual(junction1x0.inputs, []);
      assert.deepEqual(junction2x0.inputs, [ junction1x0 ]);
      assert.deepEqual(junction3x0.inputs, []);
      assert.deepEqual(junction3x1.inputs, []);
      assert.deepEqual(junction4x0.inputs, [ junction2x0 ]);
    });
  });
  describe("#disconnectChannel(destination: any, input: number): void", () => {
    it("works", () => {
      /**
       *                  +-----------+
       *                  | node1 [0] |
       *                  +-----------+
       *                        |
       *                  +-----------+
       *                  | node2 [0] |
       *                  +-----------+
       *                        |
       *        +---------------+---------------+
       *        |               *               |
       *        |                               |
       *  +-----------+   +-----------+   +-----------+
       *  | node3 [0] |   | node3 [1] |   | node4 [0] |
       *  +-----------+   +-----------+   +-----------+
       */
      let node1 = {}, junction1x0 = new Junction(node1, 0);
      let node2 = {}, junction2x0 = new Junction(node2, 0);
      let node3 = {}, junction3x0 = new Junction(node3, 0), junction3x1 = new Junction(node3, 1);
      let node4 = {}, junction4x0 = new Junction(node4, 0);

      junction1x0.connect(junction2x0);
      junction2x0.connect(junction3x0);
      junction2x0.connect(junction3x1);
      junction2x0.connect(junction4x0);

      junction2x0.disconnectChannel(node3, 1);

      assert.deepEqual(junction1x0.outputs, [ junction2x0 ]);
      assert.deepEqual(junction2x0.outputs, [ junction3x0, junction4x0 ]);
      assert.deepEqual(junction3x0.outputs, []);
      assert.deepEqual(junction3x1.outputs, []);
      assert.deepEqual(junction4x0.outputs, []);
      assert.deepEqual(junction1x0.inputs, []);
      assert.deepEqual(junction2x0.inputs, [ junction1x0 ]);
      assert.deepEqual(junction3x0.inputs, [ junction2x0 ]);
      assert.deepEqual(junction3x1.inputs, []);
      assert.deepEqual(junction4x0.inputs, [ junction2x0 ]);
    });
  });
  describe("#isConnected(destination: any): boolean", () => {
    it("works", () => {
      /**
       *                  +-----------+
       *                  | node1 [0] |
       *                  +-----------+
       *                        |
       *                  +-----------+
       *                  | node2 [0] |
       *                  +-----------+
       *                        |
       *        +---------------+---------------+
       *        |               |               |
       *        |               |               |
       *  +-----------+   +-----------+   +-----------+
       *  | node3 [0] |   | node3 [1] |   | node4 [0] |
       *  +-----------+   +-----------+   +-----------+
       */
      let node1 = {}, junction1x0 = new Junction(node1, 0);
      let node2 = {}, junction2x0 = new Junction(node2, 0);
      let node3 = {}, junction3x0 = new Junction(node3, 0), junction3x1 = new Junction(node3, 1);
      let node4 = {}, junction4x0 = new Junction(node4, 0);

      junction1x0.connect(junction2x0);
      junction2x0.connect(junction3x0);
      junction2x0.connect(junction3x1);
      junction2x0.connect(junction4x0);

      assert(junction1x0.isConnected(node2) === true);
      assert(junction1x0.isConnected(node3) === false);
      assert(junction1x0.isConnected(node4) === false);
      assert(junction2x0.isConnected(node1) === false);
      assert(junction2x0.isConnected(node3) === true);
      assert(junction2x0.isConnected(node4) === true);
      assert(junction3x0.isConnected(node1) === false);
      assert(junction3x0.isConnected(node3) === false);
      assert(junction3x0.isConnected(node4) === false);
      assert(junction3x1.isConnected(node1) === false);
      assert(junction3x1.isConnected(node3) === false);
      assert(junction3x1.isConnected(node4) === false);
      assert(junction4x0.isConnected(node1) === false);
      assert(junction4x0.isConnected(node3) === false);
      assert(junction4x0.isConnected(node4) === false);
    });
  });
});
