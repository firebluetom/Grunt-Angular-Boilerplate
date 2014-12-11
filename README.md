=============

This is a sample template to start an angularJS project with Grunt. Great for front end devs, which consume back end services. Very customizable, but most the ground work has been done. Includes two sample modules to show how wiring works.

## Requirements for local dev

In order to create a local build of this project you must have the following things:

 * NodeJS - JavaScript runtime environment
 * NPM - NodeJS package manager (will generally be included with NodeJS)
 * Ruby & Compass - Used for compiling SCSS to CSS - (must install Ruby and Compass)
 * GruntJS - Task Runner
 * Bower - Package manager for the web


## Installation

```

$ git clone https://github.com/firebluetom/grunt-angular-template.git.
$ cd /into project directory/ Ex: cd grunt-angular-template
$ npm install (wait)
$ bower install (wait, then done)

```

## Starting project

```

$ grunt

```

## Some other useful tasks

```

$ grunt rebuild

```

## index.html included scripts

On the default index.html page we include three scripts that will be loaded at build time. Each one is the result of concating a diffrent set of files, please see below for more details.

	* <script type="text/javascript" src="script/libs.js"></script>
    * <script type="text/javascript" src="script/common.js"></script>
	* <script type="text/javascript" src="script/core.js"></script>

libs.js

	* './script/tmplib/**/angular.js'
	* './script/tmplib/**/*.js'
	* 'src/app/module/common/script/lib/*.js'

common.js

	* 'src/app/module/common/script/config/general.js',
	* 'src/app/module/common/script/application.js',
	* 'src/app/module/common/script/**/*.js'

core.js - This one makes a js file for each module under the below folder and combines into single JS file

	* 'scr/app/module/core/'

## How to define routes

During the development of this application we will need to add many routes. These routes are defined under a file called view.json inside the src/app/platform/default/config folder

You can define another platform in this project if you wish, but you will need another folder under src/app/platform other than default and change the js files appropriately

| Platforms     | Inherits Defaults | Overwrites |
| ------------- |:-----------------:|:----------:|
| Default       | True 				| False		 |
| Something		| True      		| True		 |

Routes are pulled in as part of the concat JSON task along with other platform config information.

	Source for Routes: src/app/platform/<platform>/config/view.json
	Destination		 : appBuild/qa/platform/<platform>/config/output.json

```javascript

Example:

	{
	    "angular": {
	        "views": {
	            "otherwise": {
	                "redirectTo": "/page"
	            },
	            "landing": {
	                "hash": "/page",
	                "settings": {
	                    "templateUrl": "{{baseViewPath}}/view/page.html",
	                    "controller": "indexCtrl"
	                }
	            },
	            ...
	        }
	    }
	}

```

## Development and Deployment

#### Correct URL Base for Server
First modification which should be made is to index.html in <code> src/app/index.html </code>; modify this line:

```HTML

Change
<base href='/' /> <!-- use in local development. Ex: http://localhost:3000/#/landing -->
to
<base href='/yourProjectBase/' /> <!-- use for deployment. Ex: http://yourServer.com:8180/yourProcectBase/#/landing -->

```

---------------------------

## Additional Instructions

Structure of the application is as such:

HTML goes under src/app/platform/default/view, you will need to reference it as such when using  ng-include="'/platform/default/view/myhtml.html'" 

Styles go under platform/default/style, add your scss files here, import inside styles.scss

JavaScript goes in multiple places, depending on what you want to achieve, the code includes some examples of how to create controllers, services, etc. But for the sake of clarity, open src/app/module/common, this directory will contain all your common JS, things that should be available anywhere in the app and doesn't need to be imported. 

The .config and .run methods for the app can be found in <strong>application.js</strong> (src/app/module/common/script)- here you can play with the routeprovider, cache templates ahead of time, run some setup before the rest of the application runs, etc.

general.js - this is where the application is first defined, you can give it a name here and define the dependencies and overall add anything onto the application you wish and it will be globally available where the global variable is injected.

Any modules you wish to add to your application should go into the core folder (src/app/module/core/{{moduleName}}).
Examples are provided and files are grouped by type (controllers, directives, filters, etc). This structure is not enforced and you can group by feature instead.

---------------------------

## Troubleshooting

Sometimes your page might not load, here are a few scenarios and fixes

1. The page is completely blank.
  * This may be due to the index.html file having the wrong base. See above in Development and Deployment. You can find the index.html file in <code> src/app/index.html </code>. Also, check your routes.

2. The landing page loads, but just about everything is missing, nothing on the left or middle of the screen, but the right side may be loaded.


