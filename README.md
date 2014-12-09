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

## Troubleshooting

Sometimes your page might not load, here are a few scenarios and fixes

1. The page is completely blank.
  * This may be due to the index.html file having the wrong base. See above in Development and Deployment. You can find the index.html file in <code> src/app/index.html </code>. Also, check your routes.

2. The landing page loads, but just about everything is missing, nothing on the left or middle of the screen, but the right side may be loaded.


---------------------------

## Mac Dev Notes

Still waiting...

## Pc Dev Notes

Still waiting...

---------------------------
