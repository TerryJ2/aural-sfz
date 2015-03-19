"use strict";

var util = require('./lib/util'),
    fourGiga = 4294967296;

var SfzRegion = function () {
    this.innerSequence = 0;
};

SfzRegion.prototype.innerSequence = 0;

SfzRegion.prototype.sample = null;
SfzRegion.prototype.volume = 0;
SfzRegion.prototype.pan = 0;
SfzRegion.prototype.transpose = 0;
SfzRegion.prototype.tune = 0;
SfzRegion.prototype.pitchKeyCenter = 60;
SfzRegion.prototype.pitchKeyTrack = 100;
SfzRegion.prototype.pitchRandom = 0;
SfzRegion.prototype.loChannel = 0;
SfzRegion.prototype.hiChannel = 16;
SfzRegion.prototype.loKey = 0;
SfzRegion.prototype.hiKey = 127;
SfzRegion.prototype.loRand = 0;
SfzRegion.prototype.hiRand = 1;
SfzRegion.prototype.loVelocity = 0;
SfzRegion.prototype.hiVelocity = 127;
SfzRegion.prototype.loBpm = 0;
SfzRegion.prototype.hiBpm = 500;
SfzRegion.prototype.sequenceLength = 1;
SfzRegion.prototype.sequencePosition = 1;
SfzRegion.prototype.offset = 0;
SfzRegion.prototype.offsetRandom = 0;
SfzRegion.prototype.end = 0;
SfzRegion.prototype.switchLast = 0;
SfzRegion.prototype.switchLoKey = 0;
SfzRegion.prototype.switchHiKey = 127;
SfzRegion.prototype.switchDown = 0;
SfzRegion.prototype.switchUp = 0;
SfzRegion.prototype.switchPrevious = null;

/**
 * Set several properties of the region
 * @param {Object} properties - Object containing the options
 */
SfzRegion.prototype.setProperties = function (properties) {
    var key;

    for (key in properties) {
        if (properties.hasOwnProperty(key)) {
            this.setProperty(key, properties[key]);
        }
    }
};

/**
 * Set a specific property of the region
 * @param {string} property - Property name (as per sfz specifications)
 * @param {*} value - Value
 */
SfzRegion.prototype.setProperty = function (property, value) {
    switch (property) {
        case 'sample':
            this.sample = value;
            break;
        case 'lochan':
            this.loChannel = util.clampInteger(value, 0, 16);
            break;
        case 'hichan':
            this.hiChannel = util.clampInteger(value, 0, 16);
            break;
        case 'key':
            this.setProperty('lokey', value);
            this.setProperty('hikey', value);
            this.setProperty('picth_keycenter', value);
            break;
        /*
         case 'lokey':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.loKey = Math.min(127, Math.max(0, value)); break;
         case 'hikey':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.hiKey = Math.min(127, Math.max(0, value)); break;
         */
        case 'lovel':
            this.loVelocity = util.clampInteger(value, 0, 127);
            break;
        case 'hivel':
            this.hiVelocity = util.clampInteger(value, 0, 127);
            break;
        case 'lorand':
            this.loRand = util.clampFloat(value, 0, 1);
            break;
        case 'hirand':
            this.hiRand = util.clampFloat(value, 0, 1);
            break;
        case 'lobpm':
            this.loBpm = util.clampFloat(value, 0, 500);
            break;
        case 'hibpm':
            this.hiBpm = util.clampFloat(value, 0, 500);
            break;
        case 'seq_length':
            this.sequenceLength = util.clampInteger(value, 0, 100);
            break;
        case 'seq_position':
            this.sequencePosition = util.clampInteger(value, 0, 100);
            break;
        case 'volume':
            this.volume = util.clampFloat(value, -144, 6);
            break;
        case 'pan':
            this.pan = util.clampFloat(value, -100, 100);
            break;
        case 'offset':
            this.offset = util.clampInteger(value, 0, fourGiga);
            break;
        case 'offset_random':
            this.offsetRandom = util.clampInteger(value, 0, fourGiga);
            break;
        case 'end':
            this.end = util.clampInteger(value, -1, fourGiga);
            break;
        case 'transpose':
            this.transpose = util.clampInteger(value, -127, 127);
            break;
        case 'tune':
            this.tune = util.clampInteger(value, 1, 100);
            break;
        /*
         case 'pitch_keycenter':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.pitchKeyCenter = Math.min(127, Math.max(0, value)); break;
         */
        case 'pitch_keytrack':
            this.pitchKeyTrack = util.clampInteger(value, -1200, 1200);
            break;
        case 'pitch_random':
            this.pitchRandom = util.clampInteger(value, 0, 9600);
            break;
        /*
         case 'sw_last':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.switchLast = Math.min(127, Math.max(0, value)); break;
         case 'sw_lokey':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.switchLoKey = Math.min(127, Math.max(0, value)); break;
         case 'sw_hikey':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.switchHiKey = Math.min(127, Math.max(0, value)); break;
         case 'sw_down':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.switchDown = Math.min(127, Math.max(0, value)); break;
         case 'sw_up':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.switchUp = Math.min(127, Math.max(0, value)); break;
         case 'sw_previous':
         value = (typeof value === 'string' && !/^[0-9]+$/.test(value) ? Aural.Music.Note.getMidiFromLabel(value): parseInt(value, 10));
         this.switchPrevious = parseInt(value, 10); break;
         */
        default:
            break;
    }
};

/**
 * Check if the region must be triggered by an incoming event
 * @param {Number} channel - Channel number
 * @param {Number} key - Midi value
 * @param {Number} cents - Cents
 * @param {Number} velocity - Velocity
 * @param {Number} bpm - Tempo in beats per minutes
 * @param {Number} rand - Random value for round robin
 * @return {boolean} Return whether the region must be triggered
 */
SfzRegion.prototype.matchNote = function (channel, key, cents, velocity, bpm, rand) {
    this.innerSequence++;

    if (this.innerSequence > this.sequenceLength) {
        this.innerSequence = 1;
    }

    return (
    channel >= this.loChannel && channel <= this.hiChannel && //channel check
    key >= this.loKey && key <= this.hiKey && //midi value check
    velocity >= this.loVelocity && velocity <= this.hiVelocity && //velocity layer
    this.innerSequence === this.sequencePosition && rand >= this.loRand && rand <= this.hiRand && //round robin
    bpm >= this.loBpm && bpm <= this.hiBpm
    );
};

module.exports = SfzRegion;