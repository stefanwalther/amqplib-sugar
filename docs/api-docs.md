## Classes

<dl>
<dt><a href="#AmqpSugarLib">AmqpSugarLib</a></dt>
<dd><p>Sugar methods to work with amqplib.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#rabbitConnectionDef">rabbitConnectionDef</a> : <code>string</code></dt>
<dd><p>RabbitMQ Server definition.</p>
</dd>
<dt><a href="#retryBehavior">retryBehavior</a> : <code>object</code></dt>
<dd><p>Retry behavior in case RabbitMQ is not available.</p>
</dd>
</dl>

<a name="AmqpSugarLib"></a>

## AmqpSugarLib
Sugar methods to work with amqplib.

**Kind**: global class  

* [AmqpSugarLib](#AmqpSugarLib)
    * [.publishMessage(opts)](#AmqpSugarLib.publishMessage) ⇒ <code>Promise</code>
    * [._fixOptions(opts)](#AmqpSugarLib._fixOptions)
    * [.connect()](#AmqpSugarLib.connect) ⇒ <code>Promise</code>

<a name="AmqpSugarLib.publishMessage"></a>

### AmqpSugarLib.publishMessage(opts) ⇒ <code>Promise</code>
Post a message to RabbitMq.

**Kind**: static method of [<code>AmqpSugarLib</code>](#AmqpSugarLib)  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Configuration to use to publish a message. |
| opts.server | <code>string</code> | RabbitMQ server. If a string is passed, it's just the URI. |
| opts.exchange | <code>object</code> | Information about the exchange. |
| opts.exchange.type | <code>string</code> | 'topic', 'direct' |
| opts.exchange.name | <code>string</code> | Name of the exchange. |
| opts.key | <code>string</code> | Key to publish the message. |
| opts.payload | <code>object</code> | The message to post. |
| opts.options | <code>Object</code> | Options to publish. |
| [opts.correlationId] | <code>string</code> | RabbitMQ's correlationId. |
| [opts.retry_behavior] | [<code>retryBehavior</code>](#retryBehavior) | Retry behavior. |

<a name="AmqpSugarLib._fixOptions"></a>

### AmqpSugarLib._fixOptions(opts)
Subscribe to a message.

**Kind**: static method of [<code>AmqpSugarLib</code>](#AmqpSugarLib)  

| Param |
| --- |
| opts | 

<a name="AmqpSugarLib.connect"></a>

### AmqpSugarLib.connect() ⇒ <code>Promise</code>
Connect to RabbitMQ.

Very similar to amqp.connect, but with the big difference, that if the connection
fails, the operation will retry as defined in opts.retry_behavior

**Kind**: static method of [<code>AmqpSugarLib</code>](#AmqpSugarLib)  
**Returns**: <code>Promise</code> - - Returns the promise as defined for amqplib.connect  

| Param | Type | Description |
| --- | --- | --- |
| opts.server | [<code>rabbitConnectionDef</code>](#rabbitConnectionDef) | Connection information for the server. |
| opts.retry_behavior | [<code>retryBehavior</code>](#retryBehavior) | Retry behavior for establishing the connection. |

<a name="rabbitConnectionDef"></a>

## rabbitConnectionDef : <code>string</code>
RabbitMQ Server definition.

**Kind**: global typedef  
<a name="retryBehavior"></a>

## retryBehavior : <code>object</code>
Retry behavior in case RabbitMQ is not available.

**Kind**: global typedef  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| retries | <code>number</code> | The maximum amount of times to retry the operation. Defaults to 10. |
| enabled | <code>boolean</code> | Whether retry is enabled at all or not (defaults to true); setting to false is equal to keeping [retryBehavior](#retryBehavior) empty. |
| interval | <code>number</code> | Interval in ms. |
| times | <code>number</code> | Amount of times the given operation should be retried. |
| attempts | <code>number</code> | Readonly, current amount of attempts. |

