'use strict';

require('dotenv').config();

const ssUpdate = require(`./libs/sheet`);

const OURA_ACCESS_TOKEN = process.env.OURA_ACCESS_TOKEN;
const GOOGLE_SA_KEY_JSON = process.env.GOOGLE_SA_KEY_JSON;
const SHEET_ID = process.env.SHEET_ID;

const OuraApiV2Client = require('oura-api-v2-client').default;
const ouraApiV2Client = new OuraApiV2Client(OURA_ACCESS_TOKEN);

const main = async () => {
  
  const dailyActivity = await ouraApiV2Client.dailyActivity();
  // console.log(dailyActivity.data);

  const actData = dailyActivity.data[0];
  let appendData = [];
  appendData.push(actData.class_5_min);
  appendData.push(actData.score);
  appendData.push(actData.active_calories);
  appendData.push(actData.average_met_minutes);
  appendData.push(actData.contributors.meet_daily_targets);
  appendData.push(actData.contributors.move_every_hour);
  appendData.push(actData.contributors.recovery_time);
  appendData.push(actData.contributors.stay_active);
  appendData.push(actData.contributors.training_frequency);
  appendData.push(actData.contributors.training_volume);
  appendData.push(actData.equivalent_walking_distance);
  appendData.push(actData.high_activity_met_minutes);
  appendData.push(actData.high_activity_time);
  appendData.push(actData.inactivity_alerts);
  appendData.push(actData.low_activity_met_minutes);
  appendData.push(actData.low_activity_time);
  appendData.push(actData.medium_activity_met_minutes);
  appendData.push(actData.medium_activity_time);
  appendData.push(actData.met.interval);
  appendData.push(actData.met.items.toString());
  appendData.push(actData.met.timestamp);
  appendData.push(actData.meters_to_target);
  appendData.push(actData.non_wear_time);
  appendData.push(actData.resting_time);
  appendData.push(actData.sedentary_met_minutes);
  appendData.push(actData.sedentary_time);
  appendData.push(actData.steps);
  appendData.push(actData.target_calories);
  appendData.push(actData.target_meters);
  appendData.push(actData.total_calories);
  appendData.push(actData.day);
  appendData.push(actData.timestamp);

  const res = await ssUpdate(GOOGLE_SA_KEY_JSON, SHEET_ID, appendData);
  console.log(res.statusText);
};

main();
