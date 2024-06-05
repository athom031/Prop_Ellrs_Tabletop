# Test Logs


### Test 1: Buttons / Keys Disabled Before First Place

```
MOVE
LEFT
RIGHT
REPORT
OUTPUT: NULL (no functionality until player is placed)
```

### Test 2: Player is Placed facing North

```
PLACE 0, 0
REPORT
OUTPUT: 0, 0, NORTH
```

### TEST 3: Player cant move off north border

```
PLACE 0, 4
MOVE
REPORT
OUTPUT: 0, 4, NORTH
```

### TEST 4: Player cant move off east border

```
PLACE 4, 4
RIGHT
MOVE
REPORT
OUTPUT: 4, 4, EAST
```

### TEST 5: Player cant move off south border

```
PLACE 0,0
RIGHT
RIGHT
MOVE
REPORT
OUTPUT: 0, 0, SOUTH
```

### TEST 6: Player cant move off west border

```
PLACE 0, 2
LEFT
MOVE
REPORT
OUTPUT: 0, 2, WEST
```

### TEST 7: Player can complete circle by turning left 4 times

```
PLACE 0, 0
REPORT
OUTPUT: 0, 0, NORTH
LEFT
LEFT
LEFT
LEFT
REPORT
OUTPUT: 0, 0, NORTH
```

### TEST 8: Player can complete circle by turning right 4 times

```
PLACE 0, 0
REPORT
OUTPUT: 0, 0, NORTH
RIGHT
RIGHT
RIGHT
RIGHT
REPORT
OUTPUT: 0, 0, NORTH
```

### TEST 9: Trying to place player in same location doesn't overwrite direction

```
PLACE 0, 0
REPORT
OUTPUT: 0, 0, NORTH
RIGHT
PLACE 0, 0
REPORT
OUTPUT: 0, 0, EAST
```

### TEST 10: Can place elsewhere on board after initial place

```
PLACE 0, 0
REPORT
OUTPUT: 0, 0, NORTH
PLACE 4, 4
REPORT
OUTPUT: 4, 4, NORTH
```
