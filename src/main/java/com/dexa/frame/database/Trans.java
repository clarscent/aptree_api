package com.dexa.frame.database;

import java.lang.annotation.*;

@Inherited
@Retention(value = RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface Trans {
}
