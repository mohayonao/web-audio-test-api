describe("AudioNodeDisconnectUtils", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;
  var versions;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("channel disconnect", function() {
    before(function() {
      versions = WebAudioTestAPI.getTargetVersions();
      WebAudioTestAPI.setTargetVersions(0);
    });
    after(function() {
      WebAudioTestAPI.setTargetVersions(versions);
    });

    describe("disconnect(output = 0): void", function() {
      it("assertion", function() {
        var node = audioContext.createGain();

        assert.throws(function() {
          node.disconnect(1.5);
        }, TypeError);

        assert.throws(function() {
          node.disconnect(2);
        }, TypeError);
      });
      it("works", function() {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
        var gain = audioContext.createGain();

        splitter.connect(merger, 0, 0);
        splitter.connect(merger, 1, 1);
        splitter.connect(gain, 0, 0);
        merger.connect(audioContext.destination);
        gain.connect(audioContext.destination);

        splitter.disconnect();

        assert.deepEqual(audioContext.toJSON(), {
          name: "AudioDestinationNode",
          inputs: [
            {
              name: "ChannelMergerNode",
              inputs: [
                [],
                [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ]
              ]
            },
            {
              name: "GainNode",
              gain: {
                value: 1,
                inputs: []
              },
              inputs: []
            }
          ]
        });
      });
    });
  });
  describe("selective disconnect", function() {
    before(function() {
      versions = WebAudioTestAPI.getTargetVersions();
      WebAudioTestAPI.setTargetVersions(Infinity);
    });
    after(function() {
      WebAudioTestAPI.setTargetVersions(versions);
    });

    describe("disconnect(): void", function() {
      it("works", function() {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
        var gain = audioContext.createGain();

        splitter.connect(merger, 0, 0);
        splitter.connect(merger, 1, 1);
        splitter.connect(gain, 0, 0);
        merger.connect(audioContext.destination);
        gain.connect(audioContext.destination);

        splitter.disconnect();

        assert.deepEqual(audioContext.toJSON(), {
          name: "AudioDestinationNode",
          inputs: [
            {
              name: "ChannelMergerNode",
              inputs: [
                [],
                []
              ]
            },
            {
              name: "GainNode",
              gain: {
                value: 1,
                inputs: []
              },
              inputs: []
            }
          ]
        });
      });
    });
    describe("disconnect(output: number): void", function() {
      it("assertion", function() {
        var node = audioContext.createGain();

        assert.throws(function() {
          node.disconnect(1.5);
        }, TypeError);

        assert.throws(function() {
          node.disconnect(2);
        }, TypeError);
      });
      it("works", function() {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
        var gain = audioContext.createGain();

        splitter.connect(merger, 0, 0);
        splitter.connect(merger, 1, 1);
        splitter.connect(gain, 0, 0);
        merger.connect(audioContext.destination);
        gain.connect(audioContext.destination);

        splitter.disconnect(0);

        assert.deepEqual(audioContext.toJSON(), {
          name: "AudioDestinationNode",
          inputs: [
            {
              name: "ChannelMergerNode",
              inputs: [
                [],
                [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ]
              ]
            },
            {
              name: "GainNode",
              gain: {
                value: 1,
                inputs: []
              },
              inputs: []
            }
          ]
        });
      });
    });
    describe("disconnect(destination: AudioNode): void", function() {
      it("assertion", function() {
        var node1 = audioContext.createGain();
        var node2 = audioContext.createGain();

        assert.throws(function() {
          node1.disconnect("INVALID");
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2);
        }, TypeError);
      });
      it("works", function() {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
        var gain = audioContext.createGain();

        splitter.connect(merger, 0, 0);
        splitter.connect(merger, 1, 1);
        splitter.connect(gain, 0, 0);
        merger.connect(audioContext.destination);
        gain.connect(audioContext.destination);

        splitter.disconnect(merger);

        assert.deepEqual(audioContext.toJSON(), {
          name: "AudioDestinationNode",
          inputs: [
            {
              name: "ChannelMergerNode",
              inputs: [
                [],
                []
              ]
            },
            {
              name: "GainNode",
              gain: {
                value: 1,
                inputs: []
              },
              inputs: [
                {
                  name: "ChannelSplitterNode",
                  inputs: []
                }
              ]
            }
          ]
        });
      });
    });
    describe("disconnect(destination: AudioNode, output: number): void", function() {
      it("assertion", function() {
        var node1 = audioContext.createGain();
        var node2 = audioContext.createGain();

        assert.throws(function() {
          node1.disconnect("INVALID", 0);
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2, 0);
        }, TypeError);

        node1.connect(node2);

        assert.throws(function() {
          node1.disconnect(node2, 0.25);
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2, 1);
        }, TypeError);
      });
      it("works", function() {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
        var gain = audioContext.createGain();

        splitter.connect(merger, 0, 0);
        splitter.connect(merger, 1, 1);
        splitter.connect(gain, 0, 0);
        merger.connect(audioContext.destination);
        gain.connect(audioContext.destination);

        splitter.disconnect(merger, 1);

        assert.deepEqual(audioContext.toJSON(), {
          name: "AudioDestinationNode",
          inputs: [
            {
              name: "ChannelMergerNode",
              inputs: [
                [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ],
                []
              ]
            },
            {
              name: "GainNode",
              gain: {
                value: 1,
                inputs: []
              },
              inputs: [
                {
                  name: "ChannelSplitterNode",
                  inputs: []
                }
              ]
            }
          ]
        });
      });
    });
    describe("disconnect(destination: AudioNode, output: number, input: number): void", function() {
      it("assertion", function() {
        var node1 = audioContext.createGain();
        var node2 = audioContext.createGain();

        assert.throws(function() {
          node1.disconnect("INVALID", 0, 0);
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2, 0, 0);
        }, TypeError);

        node1.connect(node2);

        assert.throws(function() {
          node1.disconnect(node2, 0.25, 0);
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2, 0, 0.25);
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2, 1, 0);
        }, TypeError);

        assert.throws(function() {
          node1.disconnect(node2, 0, 1);
        }, TypeError);
      });
      it("works", function() {
        var splitter = audioContext.createChannelSplitter(2);
        var merger = audioContext.createChannelMerger(2);
        var gain = audioContext.createGain();

        splitter.connect(merger, 0, 0);
        splitter.connect(merger, 1, 1);
        splitter.connect(gain, 0, 0);
        merger.connect(audioContext.destination);
        gain.connect(audioContext.destination);

        splitter.disconnect(merger, 1, 0);

        assert.deepEqual(audioContext.toJSON(), {
          name: "AudioDestinationNode",
          inputs: [
            {
              name: "ChannelMergerNode",
              inputs: [
                [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ],
                [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ]
              ]
            },
            {
              name: "GainNode",
              gain: {
                value: 1,
                inputs: []
              },
              inputs: [
                {
                  name: "ChannelSplitterNode",
                  inputs: []
                }
              ]
            }
          ]
        });
      });
    });
  });
});
