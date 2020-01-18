import React, { Component } from 'react'
import Router from './App/routes'
class Main extends Component {
  render() {
    return (
      <Router TrackChanges={(e) => this.TrackChanges(e)} />
    )
  }
}
export default Main