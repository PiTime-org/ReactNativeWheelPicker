/**
 * @prettier
 * @flow
 * */

 import React from 'react'
 import { View, StyleSheet, Text } from 'react-native'
 import WheelPicker from './WheelPicker'
 import {
   hourTo24Format,
   hourTo12Format,
   getHoursArray,
   getFiveMinutesArray,
   getAmArray,
 } from './Utils'
 
 const AM = 'AM'
 const HOUR = 60
 
 type Event = {
   data: string | number,
   position: number,
 }
 
 type Props = {
   initDate: string,
   onTimeSelected: Date => void,
   hours: Array<number>,
   minutes: Array<string>,
   format24: boolean,
 }
 
 type State = {
   selectedDate: Date,
   hours: Array<number>,
   minutes: Array<string>,
   selectedHourIndex: number,
   selectedMinuteIndex: number,
   selectedAmIndex: number,
 }
 
 export default class TimePicker extends React.Component<Props, State> {
   constructor(props: Props) {
     super(props)
     const { initDate, format24, minutes } = props
     const selectedDate = initDate ? new Date(initDate) : new Date()
     const time12format = hourTo12Format(selectedDate.getHours())
     const time24format = selectedDate.getHours()
     const hours = this.props.hours || getHoursArray(format24)
     const selectedHourIndex = format24 ? time24format : Number(time12format[0]) - 1
     const minutesCount = minutes ? minutes.length : 12
 
     const selectedMinuteIndex = Math.round(
       selectedDate.getMinutes() / (HOUR / minutesCount)
     )
     const selectedAmIndex = time12format[1] === AM ? 0 : 1
     this.state = {
       selectedDate,
       hours,
       minutes: minutes || getFiveMinutesArray(),
       selectedHourIndex,
       selectedMinuteIndex,
       selectedAmIndex,
     }
   }
 
   render() {
     const { hours, selectedHourIndex, minutes, selectedMinuteIndex } = this.state
     const { indicatorStyle, hourTextStyle,minTextStyle } = this.props
 
     return (
       <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
         <WheelPicker
           isCyclic
           style={styles.wheelPicker}
           {...this.props}
           data={hours}
           onItemSelected={this.onHourSelected}
           selectedItem={selectedHourIndex}
           initPosition={0}
         />
         <WheelPicker
           style={styles.wheelPicker}
           isCyclic
           {...this.props}
           data={minutes}
           onItemSelected={this.onMinuteSelected}
           selectedItem={selectedMinuteIndex}
           initPosition={0}
         />
         {!this.props.format24 && this.renderAm()}
         <View
           style={{...indicatorStyle},styles.indicatorDefaultStyle}>
           {this.props.format24 &&
             <>
               <View
                 style={{
                   zIndex: 100,
                   flex: 0.5,
                   alignItems: 'flex-end',
                 }}>
                 <Text
                   style={{
                     paddingLeft: 6.89,
                     color: '#575756',
                     ...hourTextStyle
                   }}>
                   hours
                 </Text>
               </View>
               <View
                 style={{
                   zIndex: 100,
                   flex: 0.5,
                   alignItems: 'center',
                   justifyContent: 'center',
                   marginLeft: 6.89,
                 }}>
                 <Text
                   style={{
                     paddingLeft: 6.89,
                     color: '#575756',
                     ...minTextStyle
                   }}>
                   min
                 </Text>
               </View>
             </>
           }
         </View>
       </View>
     )
   }
 
   renderAm() {
     const { itemTextColor, selectedItemTextColor } = this.props
     const { selectedAmIndex } = this.state
     return (
       <WheelPicker
         style={styles.wheelPicker}
         {...this.props}
         data={getAmArray()}
         onItemSelected={this.onAmSelected}
         selectedItem={selectedAmIndex}
         initPosition={selectedAmIndex}
       />
     )
   }
 
   onHourSelected = (position: number) => {
     this.setState({ selectedHourIndex: position })
     const { selectedDate, hours } = this.state
     const selectedHour = hours[position]
 
     if (this.props.format24) {
       selectedDate.setHours(Number(selectedHour))
     } else {
       const time12format = hourTo12Format(selectedDate.getHours())
       const newTime12Format = `${selectedHour} ${time12format[1]}`
       const selectedHour24format = hourTo24Format(newTime12Format)
       selectedDate.setHours(selectedHour24format)
     }
     this.onTimeSelected(selectedDate)
   }
 
   onMinuteSelected = (position: number) => {
     this.setState({ selectedMinuteIndex: position })
     const selectedDate = this.state.selectedDate
     selectedDate.setMinutes(Number(this.state.minutes[position]))
     this.onTimeSelected(selectedDate)
   }
 
   onAmSelected = (position: number) => {
     this.setState({ selectedAmIndex: position })
     const selectedDate = this.state.selectedDate
     const time12format = hourTo12Format(selectedDate.getHours())
     const newTime12Format = `${time12format[0]} ${getAmArray()[position]}`
     const selectedHour24format = hourTo24Format(newTime12Format)
     selectedDate.setHours(selectedHour24format)
     this.onTimeSelected(selectedDate)
   }
 
   onTimeSelected(selectedDate: Date) {
     if (this.props.onTimeSelected) {
       this.props.onTimeSelected(selectedDate)
     }
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row',
     width: 330
   },
   wheelPicker: {
     height: 110,
     width: 110,
     zIndex: 100,
   },
   indicatorDefaultStyle: {
     position: 'absolute',
     alignItems: 'center',
     flexDirection: 'row',
     justifyContent: 'space-around',
     opacity: 1,
     backgroundColor: "#EAF4FF",
     height: 28,
     width: 298,
     borderRaduis: 100,
     borderRadius: 13,
     borderWidth: 1,
     borderColor: 'transparent'
   }
 })
 
 