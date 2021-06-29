# Troubleshooting

This is a brief list of possible errors. Keep in mind that other factors could cause these errors, but here is what to look for first.

## Error codes

* **400**: Not using a phone number verified by Twilio. This could be an issue with the `from_number` parameter or the `twilio_number` parameter, but not the `to_number` parameter.
* **401**: Invalid account SID or auth token
* **undefined error**: Blank account SID

## Other errors

**Call hangs up after caller answers Twilio call**: The Twilio account is a trial account, and the `to_number` parameter is for a phone number that is not verified.

It may also be that the verified phone number does not match exactly. For example, `19876543210` was called instead of `+19876543210` (that `+` makes a difference).