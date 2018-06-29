/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, PanResponder, Animated } from 'react-native';
import SwipeBox from 'react-native-swipebox';
import _ from 'lodash';
import Styles from './styles';

/**
 * @component
 */
export default class SwipeTimePicker extends Component {

    /**
     * @type {string[]}
     */
    static __ampm = ['AM', 'PM'];

    /**
     * @type {string[]}
     */
    static __12hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    /**
     * @type {string[]}
     */
    static __24hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        backgroundColor: PropTypes.string,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number,
        borderRadius: PropTypes.number,
        textColor: PropTypes.string,
        fontSize: PropTypes.number,
        fontFamily: PropTypes.string,
        onChange: PropTypes.func,
        is24: PropTypes.bool,
        customMinutes: PropTypes.array,
        customHours: PropTypes.array,
        size: PropTypes.number,
        sizeAMPM: PropTypes.number,
        spacing: PropTypes.number,
        style: PropTypes.any,
        styleAMPM: PropTypes.any,
        styleHours: PropTypes.any,
        styleMinutes: PropTypes.any,
        minuteMultiplier: PropTypes.number,
        time: PropTypes.any,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        backgroundColor: '#828186',
        borderColor: undefined,
        borderWidth: undefined,
        borderRadius: 3,
        textColor: '#FFFFFF',
        fontSize: undefined,
        fontFamily: undefined,
        style: undefined,
        styleAMPM: undefined,
        styleHours: undefined,
        styleMinutes: undefined,
        onChange: undefined,
        is24: false,
        customMinutes: undefined,
        customHours: undefined,
        size: 100,
        sizeAMPM: undefined,
        spacing: 5,
        minuteMultiplier: 1,
        time: undefined,
    }

    /**
     * @constructor
     * @param props
     */
    constructor(props, context)
    {
        super(props, context);

        this.width = this.props.width || this.props.size;
        this.height = this.props.height || this.props.size;
        this.panelSize = this.height > this.width ? this.height : this.width;

        this.state = {
            hourIndex: this.getHourIndex(),
            minuteIndex: this.getMinuteIndex(),
            apIndex: this.getAPIndex(),
        }
    }


    /**
     * @returns {*}
     */
    getHourTiles()
    {
        if(this.props.customHours) return this.props.customHours;

        return this.props.is24 ? SwipeTimePicker.__24hours : SwipeTimePicker.__12hours;
    }

    /**
     * @returns {*}
     */
    getMinuteTiles()
    {
        if(this.props.customMinutes) return this.props.customMinutes;

        let minutes = [];

        let l = Math.floor(60 / this.props.minuteMultiplier);

        for(let m = 0; m < l; m++) {

            let ma = m * this.props.minuteMultiplier;

            minutes.push((ma < 10 ? '0' : '') + (ma + ''));
        }

        return minutes;
    }

    /**
     * getTime
     * @returns {*}
     */
    getTime()
    {
        let time = this.props.time;

        if(!time) return false;

        if(_.isString(time)) {
            time = new Date(time);
        }

        return {
            hour: this.props.is24 ? time.getHours() : (time.getHours() >= 12 ? time.getHours() - 12 : time.getHours()),
            minutes: time.getMinutes(),
            ampm: time.getHours() >= 12,
        };
    }

    /**
     * getHourIndex
     * @returns {number}
     */
    getHourIndex()
    {
        let hourIndex = 0;

        const time = this.getTime();

        if(time) {
            hourIndex = this.getHourTiles().indexOf(time.hour);

            if(hourIndex == -1) hourIndex = 0;
        }

        return hourIndex;
    }

    /**
     * getMinuteIndex
     * @returns {number}
     */
    getMinuteIndex()
    {
        let minuteIndex = 0;

        const time = this.getTime();

        if(time) {
            let m = time.minutes - (time.minutes % this.props.minuteMultiplier);

            minuteIndex =  this.getMinuteTiles().indexOf(this.fillZero(m));

            if(minuteIndex == -1) minuteIndex = 0;
        }

        return minuteIndex;
    }

    /**
     * getAPIndex
     * @returns {number}
     */
    getAPIndex()
    {
        let apIndex = 0;

        const time = this.getTime();

        if(time.ampm) apIndex = 1;

        return apIndex;
    }

    /**
     * fillZero
     * @param v
     */
    fillZero(v)
    {
        return (v < 10 ? '0' : '') + v;
    }

    /**
     * update
     * @param hour
     * @param minute
     * @param ap
     */
    update(p)
    {

        const state = _.extend(this.state, p);

        const hour = parseInt(this.getHourTiles()[state.hourIndex]);
        const minute = parseInt(this.getMinuteTiles()[state.minuteIndex]);
        const ampm = state.apIndex == 1 ? true : false;


        const time = {
            hour,
            minute,
            ampm,
            text: ([this.fillZero(hour), this.fillZero(minute)].join(":")) + (this.props.is24 ? '' : (ampm ? 'PM' : 'AM'))
        };

        time.time = new Date();
        time.time.setHours(this.props.is24 ? hour : (hour + (ampm ? 12 : 0) ));
        time.time.setMinutes(minute);
        time.time.setSeconds(0);

        if(!p) {
            this.setState(_.extend(p, time));
        }

        this.props.onChange && this.props.onChange(time);
    }


    /**
     * render
     * @returns {XML}
     */
    render()
    {
        const styles = Styles(_.extend(
            {},
            this.props,
            {width: this.props.size, height: this.props.size, panelSize: this.panelSize},
        ));

        const swipeBoxProps = _.extend(
            {},
            {
                size: this.props.size,
                backgroundColor: this.props.backgroundColor,
                borderRadius: this.props.borderRadius,
                borderColor: this.props.borderColor,
                borderWidth: this.props.borderWidth,
                textColor: this.props.textColor,
                fontSize: this.props.fontSize,
                fontFamily: this.props.fontFamily
            },
            this.props.style
        );

        const swipeBoxPropsHours = _.extend(
            {},
            swipeBoxProps
        );

        const swipeBoxPropsMinutes = _.extend(
            {},
            swipeBoxProps
        );

        const swipeBoxAMPMProps = _.extend(
            {},
            swipeBoxProps,
            {size: this.props.sizeAMPM || this.props.size * 0.65}
        )

        return (
            <View style={[styles.swipeTimePickerContainer, this.props.style]}>

                <View style={styles.swipeTimePickerBoxContainer}>
                    <SwipeBox {...swipeBoxPropsHours} style={this.props.styleHours} tiles={this.getHourTiles()} selectedIndex={this.state.hourIndex} onChange={hourIndex => this.update({hourIndex})} />
                </View>

                <View style={styles.swipeTimePickerBoxContainer}>
                    <SwipeBox {...swipeBoxPropsMinutes} style={this.props.styleMinutes} tiles={this.getMinuteTiles()} selectedIndex={this.state.minuteIndex} onChange={minuteIndex => this.update({minuteIndex})} />
                </View>

                {!this.is24 ? (
                    <View style={styles.swipeTimePickerBoxContainer}>
                        <SwipeBox {...swipeBoxAMPMProps} tyle={this.props.styleAMPM} tiles={SwipeTimePicker.__ampm} selectedIndex={this.state.apIndex} onChange={apIndex => this.update({apIndex})} />
                    </View>
                ) : null}

            </View>
        );
    }
}