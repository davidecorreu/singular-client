import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SkillProfile.css';
import pathParser from '../../services/pathparser'
import { fetchIdSkillActionCreator, fetchUserActionCreator } from '../../store/actions/actions';

//PATH: root/skill_id
class SkillProfile extends Component {

  componentWillMount() {
    console.log('component mounting');
    this.initialize()
  }

  componentDidUpdate() {
    console.log('component updating');
    console.log('skill: ', this.props.skill)
    console.log('user: ', this.props.user)
    if (this.props.skill.status === 200 && this.props.user.status === 'unloaded') {
      this.props.fetchUser(this.props.skill.body.creator_id)
    }

    
  }

  initialize = async () => {
    const skillId = await pathParser(this.props.location.pathname);
    if (!skillId.first) return;
    console.log('next idskill');
    this.props.idSkill(skillId.first);
  }
  render () {
    return (
      <div>
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
              <a href="#">#css</a> <a href="#">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  skill: state.idSkill,
  user: state.user
});
const mapDispatchToProps = (dispatch) => ({
  idSkill: (id) => dispatch(fetchIdSkillActionCreator(id)),
  fetchUser: (id) => dispatch(fetchUserActionCreator(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillProfile);
