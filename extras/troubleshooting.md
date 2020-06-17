# Troubleshooting

This is a brief list of possible errors. Keep in mind that other factors could cause these errors, but here is what to look for first.

## Error codes

* **400**: Not using a phone number verified by Twilio. This could be an issue with the `fromNumber` parameter or the `twilioNumber` parameter, but not the `toNumber` parameter.
* **401**: Invalid account SID or auth token
* **undefined error**: Blank account SID

## Other errors

**Call hangs up after caller answers Twilio call**: The Twilio account is a trial account, and the `toNumber` parameter is for a phone number that is not verified.