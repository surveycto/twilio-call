# Detailed step guide to the twilio-call field plug-in

If you are brand new to Twilio, you can follow these steps to help get you set up. These steps go into deep detail on exactly what to do (which is why there are so may steps), so if you already have experience with CSV files and web applications, you may not need them, and the standard [readme](../README.md) should be enough. However, feel free to come back here at any time if you are running into trouble.

These steps were written in December 2020, but updates to Twilio may cause slight changes.

## Create Twilo account

1. Go to the [Twilio homepage](https://www.twilio.com/).
1. In the upper-right, click *Sign up*.
1. Complete the form, and sign up for the free trial.
1. Open the email you have received, and click the link to *Confirm Your Email*.
1. In the link that opens, enter a phone number you can use for verification. It will send an SMS text message to that phone number, but you will also get the option to verify via a phone call.
1. Answer the questions when prompted, or you can click *Skip to dashboard* on the lower-right.

## Set up Twilio

### Get a Trial Number

1. On your [Twilio console](https://www.twilio.com/console), click *Get a Trial Number*.

![Get a Trial Number](detailed_steps-images/get_pn.png)

2. Decide on the phone number you would like to use (you can add a different phone number later), and click *Choose this Number*.
1. When the phone number has been added, click *Done* in the lower-right of the popup. The page will then refresh.

### Set up your phone number

On a trial account, you can only make calls to and call from verified phone numbers. Follow these steps for each phone number you would like to test with. If you are already on a full Twilio account (not on a free trial), you can skip these steps. The phone number you entered earlier when creating your account will already be verified. When testing, it is okay to make the phone number you are calling from and the phone number you are calling the same phone number (we'll explain more later), so it is okay if you have only verified one phone number for now.

To learn how to add additional phone numbers, check out [this Twilio support article](https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio).

## Set up SurveyCTO form

### Set up the CSV file

1. Download the [sample form](https://github.com/surveycto/twilio-call/blob/master/extras/sample-form/Sample%20form%20-%20Twilio%20call%20field%20plug-in.xlsx?raw=true) and the [field plug-in](https://github.com/surveycto/twilio-call/blob/master/twilio-call.fieldplugin.zip?raw=true).
1. Download the CSV file. To do so, right-click [this link](https://github.com/surveycto/twilio-call/raw/master/extras/sample-form/twilio_access.csv), click *Save link as*, set format to *All Files*, add `.csv` to the file name, and save.
1. Open the CSV file you just saved. Set it aside for now, but we will need it soon.
1. Return to your [Twilio console](https://www.twilio.com/console).
1. Under *ACCOUNT SID*, copy the code there (it will start with "AC").
1. In the CSV file, replace `YOUR_SID_HERE` (under 'sid') with the account SID you copied.
1. Back on the Twilio console, copy the *AUTH TOKEN*. (Note: Do not share this auth token, since it can be used to access saved recordings).
1. In the CSV file, replace `YOUR_AUTH_TOKEN_HERE` (under 'authtoken') with the auth token you copied.
1. Back on the Twilio console, under *TRIAL NUMBER*, copy the phone number there, including the plus *+*.
1. In the CSV file, replace `YOUR_TWILIO_NUMBER_HERE` (under 'number') with the phone number you copied.
1. Save the CSV file.

### Upload the files

Once the CSV file is ready, upload them to your SurveyCTO server console as a new, deployed form with the XLSX form as the form file, and the field plug-in and CSV file as form attachments. To learn more, check out our [guide to field plug-ins](https://support.surveycto.com/hc/en-us/articles/360045234534-Guide-to-field-plug-ins-how-to-customize-fields-), section *3. Getting started with a plug-in*.

## Use the form

The way that Twilio works is that that it will use your trial number to first call your phone number, and then soon after you pick up, it will call the phone number you would like to dial. For testing purposes, it is okay if these are the same phone number; the same phone will be called twice.

When under a trial account, you can only call phone numbers that have been verified ([see above](#set-up-your-phone-number)). If you would like call phone numbers that have not been verified, you will have to sign up for a full Twilio plan.

You can follow these steps either using [SurveyCTO Collect](https://docs.surveycto.com/03-collecting-data/01-mobile-data-collection/01.mobile-collect.html), [web forms](https://docs.surveycto.com/03-collecting-data/02-web-data-collection/01.web-forms.html), or the [test view](https://docs.surveycto.com/02-designing-forms/01-core-concepts/02c.testing-forms.html).

1. Open the form.
1. For *Number to dial*, enter the phone number you would to call.
1. For *Your number*, enter your own phone number.
1. Select whether you would like to record the call, and whether the phone number will be displayed (in your actual form, these will likely be programmed into the form instead of chosen by the enumerator, but this is good for testing).
1. At the popup asking to add a group, click *Add group*.
1. You will then get to the actual field plug-in. Click the *Dial* button. Tip: You can click the *Update status* button at any time to view the current status of the call. If there is an error, check out the [troubleshooting guide](troubleshooting.md).

![Twilio field plug-in](detailed_steps-images/twilio_fpi.png)

7. The phone number entered for *Your number* will be called from your Twilio phone number. Answer that call.
1. You will get a message about how you are using a trial account. Wait for the message to end, then use the phone keypad to press any key. If you press any key before the message ends, the call will end without calling the other number. If you wait too long before pressing a key on the keypad, this will also cause the call to end without calling the other number. This will not be a concern if you upgrade to a full Twilio account.
1. The phone number entered for *Number to dial* will be called from your Twilio phone number. Answer that call. (That phone will not require pressing any key on the keypad to continue.)
1. There will now be a connected call between those phone numbers (or a call to the same phone number if the *Your number* and *Number to dial* are the same). You can try talking, and then hang up when you are done.