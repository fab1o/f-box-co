# Alliants Front-End Engineering test
Our new client, FantasticBoxCo, has given us a brief for their new online bulk-box ordering service.

This new web-based service will let their customers order boxes to specifications that perfectly meet their packaging needs.

The client should be able to select the options for their box, and receive a quote at the end.

## Specifications
They view the quoting system as a four step process

### Step 1: Box dimension and quantity
 - Enter width, height and length of the box you require
 - Enter the quantity of boxes you would like to order

### Step 2: Select Cardboard grade
FantasticBoxCo offer a variety of grades of cardboard, each altering the price per M^2:

 - A grade: £0.20 M^2
 - B grade: £0.10 M^2
 - C grade: £0.05 M^2 (this option should not be available for boxes larger than 2M^2)

### Step 3: Select Print Quality
A variety of printing options are available for any branding / logos which are required:

 - 3 colour printing: £0.20 M^2
 - 2 colour printing: £0.10 M^2
 - Black only printing: £0.05 M^2
 - No printing (plain cardboard): £0.00
 - FantasticBoxCo branding: 5% discount on total price

### Step 4: Optional extras
 - Handles: £0.10 per box
 - Reinforced bottom: £0.05 per box (only available with grade A cardboard


## What do we want to see?
By the end of this four step process, the user should see an accurate quote taking into account all of the options and quantities they have selected.

If the user has picked any mutually exclusive options (for example, a box size of larger than 2M^2 and grade C cardboard), they should not receive the quote but a validation error telling them how to fix their quote.

Our technical expectations:
 - You can use any frameworks, libraries or architecture of your choice.
 - A test suite proving correctness of the business logic (end-to-end acceptance testing is a nice extra)
